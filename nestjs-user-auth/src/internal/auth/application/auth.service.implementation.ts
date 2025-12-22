/* eslint-disable @typescript-eslint/no-unused-vars */
import { RedisDatasource } from '@/datasource/redis.datasource';
import { AuthServiceInterface } from '@/internal/auth/application/auth.service.interface';
import {
  GetUserBaseReqDto,
  GetUserBaseResDto,
  PermissionResDto,
  RoleResDto,
} from '@/internal/auth/application/dto/get.dto';
import {
  GetDeviceIPAdressReqDto,
  GetDeviceIPAdressResDto,
} from '@/internal/auth/application/dto/getDeviceIPAdress.dto';
import { LoginUserReqDto, LoginUserResDto } from '@/internal/auth/application/dto/login.dto';
import { RegistrateReqDto, RegistrateResDto } from '@/internal/auth/application/dto/registrate.dto';
import {
  UpdateRegistrateUserReqDto,
  UpdateRegistrateUserResDto,
} from '@/internal/auth/application/dto/updateRegistratePassword.dto';
import { VerifyRegistrateUserReqDto, VerifyRegistrateUserResDto } from '@/internal/auth/application/dto/verify.dto';
import { UserVerificationsEntity } from '@/internal/auth/domain/entity/userVerifications.entity';
import { AuthRepositoryInterface } from '@/internal/auth/domain/repository/auth.repository.interface';
import { HttpMessage } from '@/internal/global/ResponseData';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserProfileEntity } from '@/internal/user/domain/entity/userProfile.entity';
import { UserRepositoryInterface } from '@/internal/user/domain/repository/user.repository.interface';
import { NodeMailerImplementation } from '@/libs/nodemailer/nodemailer';
import { logError, logger } from '@/libs/winston/logger';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';
import { Utils } from '@/utils/utils';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthServiceImplementation implements AuthServiceInterface {
  constructor(
    @Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface,
    @Inject('UserRepository') private readonly userRepo: UserRepositoryInterface,
  ) {}
  getDeviceIPAddress(reqData: GetDeviceIPAdressReqDto): Promise<GetDeviceIPAdressResDto> {
    try {
      return Promise.resolve(new GetDeviceIPAdressResDto());
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async getUserPermissionsByUserId(reqDto: GetUserBaseReqDto): Promise<GetUserBaseResDto> {
    try {
      // gọi repo để lấy user base
      const userBaseEntity: UserEntity | null = await this.authRepo.getOneByUserId(reqDto.userId);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found');
      }
      const newUserBaseEntityResDto = new GetUserBaseResDto(
        userBaseEntity.id,
        userBaseEntity.account,
        userBaseEntity.password,
        userBaseEntity.salt,
        userBaseEntity.loginTime,
        userBaseEntity.logoutTime,
        userBaseEntity.loginIp,
        [],
        userBaseEntity.creatorId,
        userBaseEntity.modifierId,
        userBaseEntity.deletorId,
        userBaseEntity.createdAt,
        userBaseEntity.modifiedAt,
        userBaseEntity.deletedAt,
      );

      const rolesResDto: RoleResDto[] = [];
      if (userBaseEntity.roles && userBaseEntity.roles.length > 0) {
        for (const role of userBaseEntity.roles) {
          const permissions: PermissionResDto[] = [];
          for (const permission of role.permissions) {
            permissions.push(new PermissionResDto(String(permission.id), permission.name, permission.resource));
          }
          rolesResDto.push(new RoleResDto(String(role.id), role.name, permissions));
        }
        newUserBaseEntityResDto.roles = rolesResDto;
      }
      return newUserBaseEntityResDto;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }

  async login(reqData: LoginUserReqDto): Promise<LoginUserResDto> {
    try {
      const { email, password } = reqData;

      // tìm user trong bảng userBase
      const userBaseEntity: UserEntity | null = await this.authRepo.getOneByEmail(email);
      if (userBaseEntity == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, 'User not found');
      }

      if (!(await Utils.compareHashStringUsingBcryptJS(password, userBaseEntity.password))) {
        throw new ErrorCustom(HttpStatus.UNAUTHORIZED, 'Password incorrect');
      }

      // create token
      const token = Utils.generateJWTToken(
        {
          id: userBaseEntity.id,
          email: userBaseEntity.account,
        },
        'login',
      );

      // cập nhật lại trạng thái của row trong bảng verification
      userBaseEntity.loginTime = Date.now();
      userBaseEntity.loginIp = 'localhost';

      if ((await this.authRepo.updateLoginInfoInUsersTable(userBaseEntity)) != 1) {
        throw new DatabaseError('Error: update user login info');
      }

      return new LoginUserResDto(token);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async updatePassword(reqdata: UpdateRegistrateUserReqDto): Promise<UpdateRegistrateUserResDto> {
    try {
      const userKey = Utils.createUserKey(reqdata.token);
      const otpEntity: UserVerificationsEntity | null = await this.authRepo.getInfoOTP(userKey);
      if (otpEntity == null) {
        return new UpdateRegistrateUserResDto('Token not found, please try again.', false);
      }
      if (otpEntity.isVerified === 0) {
        return new UpdateRegistrateUserResDto('Token not verified, please verify first.', false);
      }
      if (reqdata.password !== reqdata.confirmPassword) {
        return new UpdateRegistrateUserResDto('Password and confirm password not match.', false);
      }

      // hash password
      const hashedPassword = await Utils.hashStringUsingBcryptJS(
        reqdata.password,
        Number(process.env.BCRYPT_SALT_ROUNDS),
      );

      // update password in users table
      if ((await this.authRepo.updatePasswordInUsersTable(userKey, hashedPassword)) !== 1) {
        throw new DatabaseError('Error: update password in users table');
      }

      // tao 1 truong trong profile
      const newUserProfile = new UserProfileEntity({
        id: randomUUID(),
        account: otpEntity.verificationKey,
        nickname: Utils.generateRamdonUserNickname(),
        avatar: '',
        state: 'vi',
        mobile: '',
        gender: 'other',
        birthday: new Date(Date.now()).toString(), // format - yyyy-mm-dd
        email: otpEntity.verificationKey,
        isAuthenticated: 0,
      });
      newUserProfile.markCreated('system');

      const isDone: number = await this.userRepo.saveNewUserProfile(newUserProfile);
      if (isDone != 1) {
        throw new DatabaseError('Error: save new user profile');
      }

      return new UpdateRegistrateUserResDto('Update password successfully.', true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async verify(reqData: VerifyRegistrateUserReqDto): Promise<VerifyRegistrateUserResDto> {
    try {
      const verifyKeyHashed = Utils.hashString(reqData.verifyKey.toLowerCase());
      const userKey = Utils.createUserKey(verifyKeyHashed);

      // tìm trong otp trong cache
      let otpInSystem: string | null = await RedisDatasource.getInstance().dataSource.get(userKey);
      let userInVerifyTable: UserVerificationsEntity | null;

      // nếu mà ko có thì phải gọi trong database để móc cái otp đã được gửi đi
      if (otpInSystem == null) {
        userInVerifyTable = await this.authRepo.getOneByHashKey(userKey);
        if (userInVerifyTable == null) {
          return new VerifyRegistrateUserResDto(reqData.verifyKey, 'Email not found, please try again.', '');
        }
        otpInSystem = userInVerifyTable.otp;
      }

      // kiểm 2 cái otp mà người ta nhập coi là có khớp ko
      if (otpInSystem !== reqData.otp) {
        return new VerifyRegistrateUserResDto(reqData.verifyKey, 'OTP not match, please try again.', '');
      }

      const newUUIDUser = randomUUID();
      // nếu mà khớp thì tạo 1 row trong table users
      await this.authRepo.saveOneUserInUsersTable(
        new UserEntity({
          id: newUUIDUser,
          account: reqData.verifyKey,
          password: '123456',
          salt: 12,
          loginTime: 0,
          logoutTime: 0,
          loginIp: 'localhost',
          creatorId: 'system',
          modifierId: 'system',
          deletorId: '',
          createdAt: Date.now(),
          modifiedAt: Date.now(),
          deletedAt: 0,
        }),
      );
      // cập nhật lại trạng thái của row trong bảng verification
      if ((await this.authRepo.updateOneVerifySuccessByEmailInVerifyTable(userKey)) != 1) {
        throw new DatabaseError('Error: update one by email in verify table');
      }

      // xoá trong redis
      if ((await Utils.deleteRedisData(userKey)) != 1) {
        throw new DatabaseError('Error: delete redis data');
      }

      // tạo role , lưu role
      if ((await this.authRepo.saveRole(newUUIDUser, ['1'])) != 1) {
        throw new DatabaseError('Error: save user roles');
      }
      // return
      return new VerifyRegistrateUserResDto(reqData.verifyKey, 'OK', verifyKeyHashed);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
  async registrate(reqData: RegistrateReqDto): Promise<RegistrateResDto> {
    try {
      // 1. encrypt email
      const verifyKeyHashed = Utils.hashString(reqData.verifyKey.toLowerCase());

      // 2. Check existed users table
      if (await this.authRepo.getOneByEmail(reqData.verifyKey)) {
        throw new ErrorCustom(HttpStatus.CONFLICT, 'User with key already exist');
      }

      // create user key otp
      const userKey = Utils.createUserKey(verifyKeyHashed);

      const otpFound: string | null = await Utils.getRedisData(userKey);

      if (otpFound != null) {
        throw new ErrorCustom(HttpStatus.CONFLICT, HttpMessage.CONFLIC);
      }

      // generate 6 digital random number
      let sixDigitalRandomNumber: number;

      if (reqData.purpose == 'dev') {
        sixDigitalRandomNumber = 123456;
        await Utils.setRedisData(userKey, `${sixDigitalRandomNumber}`, 300);
        return new RegistrateResDto(reqData.verifyKey, 'Send OTP successfully in dev mode');
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
            'Ticket4U - Xác thực đăng ký!',
            `Đăng ký thành công! Mã xác minh: ${sixDigitalRandomNumber}`,
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
          break;
        }
      }

      //return
      return new RegistrateResDto(reqData.verifyKey, 'Send OTP successfully');
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
}
