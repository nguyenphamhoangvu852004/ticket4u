import { UserVerificationsEntity } from '@/internal/auth/domain/entity/userVerifications.entity';
import { AuthRepositoryInterface } from '@/internal/auth/domain/repository/auth.repository.interface';
import {
  ChangePasswordReqDto,
  ChangePasswordResDto,
  ConfirmChangePasswordReqDto,
  ConfirmChangePasswordResDto,
} from '@/internal/user/application/dto/changePassword.dto';
import { CreateProfileReqDto, CreateProfileResDto } from '@/internal/user/application/dto/createProfile.dto';
import { SetRoleToUserReqDto, SetRoleToUserResDto } from '@/internal/user/application/dto/setRole.dto';
import { UpdateUserProfileReqDto, UpdateUserProfileResDto } from '@/internal/user/application/dto/update.dto';
import {
  VerifyChangePasswordReqDto,
  VerifyChangePasswordResDto,
} from '@/internal/user/application/dto/verifyChangePassword.dto';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserProfileEntity } from '@/internal/user/domain/entity/userProfile.entity';
import { NodeMailerImplementation } from '@/libs/nodemailer/nodemailer';
import { Utils } from '@/utils/utils';
import { Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import { randomUUID } from 'crypto';
import { HttpMessage, HttpStatus } from 'src/internal/global/ResponseData';
import { CheckExistUserReqDto } from 'src/internal/user/application/dto/checkExist.dto';
import { CreateUserReqDto, CreateUserResDto } from 'src/internal/user/application/dto/create.dto';
import { SoftDeleteUserReqDto, SoftDeleteUserResDto } from 'src/internal/user/application/dto/delete.dto';
import {
  GetUserInfoReqDto,
  GetUserInfoResDto,
  ProfileResDto,
  UserGetListReqDto,
  UserGetListResDto,
} from 'src/internal/user/application/dto/get.dto';
import { UserServiceInterface } from 'src/internal/user/application/user.service.interface';
import { UserRepositoryInterface } from 'src/internal/user/domain/repository/user.repository.interface';
import { DatabaseError, ErrorCustom, InternalServerError } from 'src/utils/ErrorCustom';

@Injectable()
export class UserServiceImpl implements UserServiceInterface {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepositoryInterface,
    @Inject('AuthRepository')
    private readonly authRepo: AuthRepositoryInterface,
  ) {}
  async setRoleToUser(reqData: SetRoleToUserReqDto): Promise<SetRoleToUserResDto> {
    try {
      // tìm cái user với cái id đó
      const userEntity: UserEntity | null = await this.userRepo.getOneByUserKey(reqData.account);
      if (userEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found, please try again');
      }
      // remove all roles of user
      const isRemoved: number = await this.authRepo.removeAllRolesOfUser(userEntity.id);
      if (isRemoved === -1) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, 'Error: remove all roles of user');
      }
      const rolesString: string[] = reqData.roleIds.map((roleId) => roleId.toString());
      const success: number = await this.authRepo.saveRole(userEntity.id, rolesString);
      if (!success) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, 'Error: save role');
      }
      return new SetRoleToUserResDto(true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async updateUserProfile(reqData: UpdateUserProfileReqDto): Promise<UpdateUserProfileResDto> {
    try {
      const userEntity: UserEntity | null = await this.authRepo.getOneByUserId(reqData.userId);
      if (!userEntity) {
        throw new ErrorCustom(404, 'User not found, please try again');
      }

      const userProfileEntity: UserProfileEntity | null = await this.userRepo.getOneUserProfileByAccount(
        userEntity.account,
      );
      if (!userProfileEntity) {
        throw new ErrorCustom(404, 'User not found, please try again');
      }

      userProfileEntity.nickname = reqData.nickname ?? userProfileEntity.nickname;
      userProfileEntity.avatar = reqData.avatar ?? userProfileEntity.avatar;
      userProfileEntity.state = reqData.state ?? userProfileEntity.state;
      userProfileEntity.mobile = reqData.mobile ?? userProfileEntity.mobile;
      userProfileEntity.gender = reqData.gender ?? userProfileEntity.gender;
      userProfileEntity.birthday = reqData.birthday ?? userProfileEntity.birthday;

      const isDone: number = await this.userRepo.updateUserProfile(userProfileEntity);
      if (isDone != 1) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
      }
      return new UpdateUserProfileResDto("User's profile updated successfully", true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async confirmChangePassword(reqData: ConfirmChangePasswordReqDto): Promise<ConfirmChangePasswordResDto> {
    try {
      //token : u:{}:otp
      const { token, password, confirmPassword } = reqData;
      if (password !== confirmPassword) {
        throw new ErrorCustom(HttpStatus.BAD_REQUEST, 'Password not match, please try again');
      }

      // cat nhat cai row verifycation
      const userVerification: UserVerificationsEntity | null = await this.authRepo.getOneByHashKey(token);
      if (userVerification == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found, please try again');
      }
      userVerification.isVerified = 1;
      userVerification.isDeleted = 1;
      userVerification.modifiedAt = Date.now();
      userVerification.modifierId = 'system';
      userVerification.deletedAt = Date.now();
      userVerification.deletorId = 'system';
      if (
        !(await this.authRepo.updateOneVerifySuccessByEmailInVerifyTable(
          userVerification.keyHash,
          userVerification.otp,
        ))
      ) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, 'Error: update one by email in verify table');
      }

      const userEntity: UserEntity | null = await this.authRepo.getOneByEmail(userVerification.verificationKey);
      if (userEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found, please try again');
      }
      userEntity.password = await Utils.hashStringUsingBcryptJS(password, userEntity.salt);
      await this.authRepo.updatePasswordInUsersTable(token, userEntity.password);
      return new ConfirmChangePasswordResDto('Password successfully changed', true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async verifyChangePassword(reqData: VerifyChangePasswordReqDto): Promise<VerifyChangePasswordResDto> {
    try {
      const userKey = Utils.createUserKey(reqData.verifyKey);

      // tìm trong otp trong cache
      let otpInSystem: string | null = await Utils.getRedisData(userKey);
      let userInVerifyTable: UserVerificationsEntity | null;

      // nếu mà ko có thì phải gọi trong database để móc cái otp đã được gửi đi
      if (otpInSystem == null) {
        userInVerifyTable = await this.authRepo.getOneByHashKey(userKey);
        if (userInVerifyTable == null) {
          return new VerifyChangePasswordResDto('User not found, please try again.', false, '');
        }
        otpInSystem = userInVerifyTable.otp;
      }

      // kiểm 2 cái otp mà người ta nhập coi là có khớp ko
      if (otpInSystem !== reqData.otp) {
        return new VerifyChangePasswordResDto('OTP not match, please try again.', false, '');
      }

      // generrate 1 cai token cho client

      // xoá trong redis va capa nha trong database
      if ((await Utils.deleteRedisData(userKey)) != 1) {
        throw new DatabaseError('Error: delete redis data');
      }

      if ((await this.authRepo.updateOneVerifySuccessByEmailInVerifyTable(userKey, reqData.otp)) != 1) {
        throw new DatabaseError('Error: update one by email in verify table');
      }

      return new VerifyChangePasswordResDto('Update password successfully.', true, userKey);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async changePassword(reqData: ChangePasswordReqDto): Promise<ChangePasswordResDto> {
    try {
      // tìm user
      const userBaseEntity: UserEntity | null = await this.userRepo.getOneByUserKey(reqData.verifyKey);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found, please try again');
      }

      // so sánh 2 pasword cũ
      if (!(await Utils.compareHashStringUsingBcryptJS(reqData.oldPassword, userBaseEntity.password))) {
        throw new ErrorCustom(HttpStatus.BAD_REQUEST, 'Password incorrect, please try again');
      }

      let sixDigitalRandomNumber: number;

      const userKey = Utils.createUserKey(reqData.verifyKey);

      if (reqData.purpose == 'dev') {
        sixDigitalRandomNumber = 123456;
        await Utils.setRedisData(userKey, `${sixDigitalRandomNumber}`, 300);
        return new ChangePasswordResDto('Send OTP successfully in dev mode', true);
      } else {
        sixDigitalRandomNumber = Utils.createSixRandomDigitalNumber();
      }

      // save otp into redis
      await Utils.setRedisData(userKey, `${sixDigitalRandomNumber}`, 300);

      //6. send otp
      switch (reqData.verifyType) {
        case 'email': {
          await NodeMailerImplementation.getInstance().sendMail(
            reqData.verifyKey,
            'Ticket4U - Xác thực đổi mật khẩu!',
            `Mã xác minh: ${sixDigitalRandomNumber}`,
          );
          // save otp into mysql
          const newUUIDUser = randomUUID();
          if (
            (await this.authRepo.saveOtp(
              new UserVerificationsEntity({
                id: newUUIDUser,
                otp: String(sixDigitalRandomNumber),
                verificationKey: reqData.verifyKey,
                type: reqData.verifyType,
                isDeleted: 0,
                isVerified: 0,
                keyHash: userKey,
                creatorId: 'system',
                modifierId: 'system',
                deletorId: '',
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                deletedAt: 0,
              }),
            )) !== 1
          ) {
            throw new DatabaseError('Error: save otp into mysql');
          }
          break;
        }
        case 'phone': {
          console.log('phone verify, từ từ làm');
          break;
        }
      }

      // // ma hoa mat khau moi
      // const hashedPassword = await Utils.hashStringUsingBcryptJS(reqData.newPassword, 12);

      // // update password in users table
      // const isChanged: number = await this.userRepo.changePassword(reqData.userKey, hashedPassword);
      // if (isChanged !== 1) {
      //   throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
      // }

      return new ChangePasswordResDto('Send OTP change password successfully', true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async createProfile(reqData: CreateProfileReqDto): Promise<CreateProfileResDto> {
    try {
      const isExistProfile: boolean = await this.userRepo.isExistProfile(reqData.account);
      if (isExistProfile == true) {
        throw new ErrorCustom(HttpStatus.CONFLIC, 'Đã tồn tại tài khoản với email này');
      }

      const newUserProfile: UserProfileEntity = new UserProfileEntity({
        id: randomUUID(),
        account: reqData.account,
        nickname: reqData.nickname,
        avatar: reqData.avatar,
        state: reqData.state,
        mobile: reqData.mobile,
        gender: reqData.gender,
        birthday: reqData.birthday,
        email: reqData.email,
        isAuthenticated: 0,
      });

      const isDone: number = await this.userRepo.saveNewUserProfile(newUserProfile);
      if (isDone != 1) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
      }

      return new CreateProfileResDto(newUserProfile.account, newUserProfile.email, newUserProfile.nickname);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async softDeleteUser(reqDto: SoftDeleteUserReqDto): Promise<SoftDeleteUserResDto> {
    try {
      const isDone: number = await this.userRepo.softDelete(reqDto.getUserId());
      if (isDone !== 1) {
        throw new ErrorCustom(HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST);
      }
      return new SoftDeleteUserResDto(true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async createUser(reqDto: CreateUserReqDto): Promise<CreateUserResDto> {
    try {
      // kiểm tra coi username đã tồn tại trong hệ thống hay chưa
      const userEntity: UserEntity = await this.userRepo.getOneByUsername(reqDto.username);
      if (userEntity != null || userEntity != undefined || userEntity != '') {
        throw new ErrorCustom(HttpStatus.CONFLIC, HttpMessage.CONFLIC);
      }

      // còn ko thì tạo mới
      const newUserEntity: UserEntity = new UserEntity({
        id: randomUUID(),
        account: reqDto.username,
        password: reqDto.password,
        loginTime: 0,
        logoutTime: 0,
        loginIp: '',
        salt: 12,
      });
      const isDone: number = await this.userRepo.save(newUserEntity);
      if (isDone != 1) {
        throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
      }
      return new CreateUserResDto(reqDto.username, reqDto.username);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async getUserInfo(reqDto: GetUserInfoReqDto): Promise<GetUserInfoResDto> {
    try {
      const { userId } = reqDto;
      const userEntity: UserEntity | null = await this.userRepo.getOneByUserId(userId);
      if (userEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }

      const userProfile: UserProfileEntity | null = await this.userRepo.getOneUserProfileByAccount(userEntity.account);
      if (userProfile == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }

      const userRoles: string[] = await this.authRepo.getRolesOfUser(userEntity.id);

      const profileResDto: ProfileResDto = new ProfileResDto(
        userProfile.account,
        userProfile.nickname,
        userProfile.avatar,
        userProfile.state,
        userProfile.mobile,
        userProfile.gender,
        userProfile.birthday,
        userProfile.email,
        Utils.formatUnixMillis(userProfile.createdAt),
        Utils.formatUnixMillis(userProfile.modifiedAt),
      );
      return new GetUserInfoResDto(
        userProfile.id,
        userProfile.account,
        0,
        '',
        Utils.formatUnixMillis(userProfile.createdAt),
        Utils.formatUnixMillis(userProfile.modifiedAt),
        profileResDto,
        userRoles,
        [],
      );
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async getListUsersAvalable(reqDto: UserGetListReqDto): Promise<UserGetListResDto> {
    try {
      log(reqDto);
      const list: UserEntity[] = await this.userRepo.getManyAvalable();
      const listResDto: GetUserInfoResDto[] = list.map(
        (user) =>
          new GetUserInfoResDto(
            user.id,
            user.account,
            user.loginTime,
            user.loginIp,
            String(user.createdAt),
            String(user.modifiedAt),
            null as unknown as ProfileResDto,
          ),
      );
      const resDto: UserGetListResDto = new UserGetListResDto(listResDto);
      return resDto;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async isExistUser(reqDto: CheckExistUserReqDto): Promise<CheckExistUserReqDto> {
    try {
      if (
        (await this.userRepo.getOneUserProfileByAccount(reqDto.getUserId())) === null ||
        (await this.userRepo.getOneUserProfileByAccount(reqDto.getUserId())) === undefined
      ) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }
      return new CheckExistUserReqDto(reqDto.getUserId());
    } catch (error) {
      log(error);
      throw new InternalServerError();
    }
  }
}
