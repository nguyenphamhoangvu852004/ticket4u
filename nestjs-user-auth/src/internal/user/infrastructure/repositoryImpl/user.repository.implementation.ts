/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MysqlDatasource } from '@/datasource/mysql.datasource';
import { PermissionsModelSchema } from '@/internal/auth/infrastructure/model/permissions.model';
import { RolesModelSchema } from '@/internal/auth/infrastructure/model/roles.model';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserProfileEntity } from '@/internal/user/domain/entity/userProfile.entity';
import { UserModelSchema } from '@/internal/user/infrastructure/model/user.model';
import { UserProfileGenderEnum, UserProfilesModelChema } from '@/internal/user/infrastructure/model/userProfiles.model';
import { Utils } from '@/utils/utils';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { HttpMessage, HttpStatus } from 'src/internal/global/ResponseData';
import { UserRepositoryInterface } from 'src/internal/user/domain/repository/user.repository.interface';
import { ErrorCustom } from 'src/utils/ErrorCustom';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImplementation implements UserRepositoryInterface {
  private userProfileRepo: Repository<UserProfilesModelChema>;
  private userRepo: Repository<UserModelSchema>;
  private rolesRepo: Repository<RolesModelSchema>;
  private users: UserEntity[];
  constructor() {
    this.userProfileRepo = MysqlDatasource.getInstance().dataSource.getRepository(UserProfilesModelChema);
    this.userRepo = MysqlDatasource.getInstance().dataSource.getRepository(UserModelSchema);
    this.rolesRepo = MysqlDatasource.getInstance().dataSource.getRepository(RolesModelSchema);
    this.users = [
      new UserEntity({
        id: '1',
        account: 'admin1',
        password: '123456',
        salt: 1,
        loginTime: 1,
        logoutTime: 1,
        loginIp: '127.0.0.1',
      }),
      new UserEntity({
        id: '2',
        account: 'admin2',
        password: '123456',
        salt: 1,
        loginTime: 1,
        logoutTime: 1,
        loginIp: '127.0.0.1',
      }),
      new UserEntity({
        id: '3',
        account: 'admin3',
        password: '123456',
        salt: 1,
        loginTime: 1,
        logoutTime: 1,
        loginIp: '127.0.0.1',
      }),
    ];
  }
  async updateUserProfile(userProfileEntity: UserProfileEntity): Promise<number> {
    try {
      const userProfile: UserProfilesModelChema | null = await this.userProfileRepo.findOne({
        where: {
          account: userProfileEntity.account,
        },
      });
      if (userProfile == null) {
        return 0;
      }
      userProfile.nickname = userProfileEntity.nickname;
      userProfile.avatar = userProfileEntity.avatar;
      userProfile.state = userProfileEntity.state;
      userProfile.mobile = userProfileEntity.mobile;
      userProfile.email = userProfileEntity.email;
      userProfile.isAuthenticated = userProfileEntity.isAuthenticated;

      const updatedUserProfile: UserProfilesModelChema = await this.userProfileRepo.save(userProfile);
      if (!updatedUserProfile) {
        return 0;
      }
      return 1;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async changePassword(userKey: string, password: string): Promise<number> {
    try {
      const userBase: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          account: userKey,
        },
      });
      if (userBase == null) {
        return 0;
      }
      userBase.password = password;
      const newUser: UserModelSchema | null = await this.userRepo.save(userBase);
      if (newUser == null) {
        return 0;
      }
      return 1;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async getOneByUserKey(account: string): Promise<UserEntity | null> {
    try {
      const userBase: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          account: account,
        },
      });
      if (userBase == null) {
        return null;
      }
      const newUserEntity: UserEntity = new UserEntity({
        id: userBase.id,
        account: userBase.account,
        password: userBase.password,
        salt: userBase.salt,
        loginTime: userBase.loginTime,
        logoutTime: userBase.logoutTime,
        loginIp: userBase.loginIp,
      });
      return newUserEntity;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async saveNewUserProfile(userProfile: UserProfileEntity): Promise<number> {
    try {
      const newUserProfile = new UserProfilesModelChema({
        id: userProfile.id,
        account: userProfile.account,
        mobile: userProfile.mobile,
        state: userProfile.state,
        avatar: userProfile.avatar,
        nickname: userProfile.nickname,
        email: userProfile.email,
        isAuthenticated: userProfile.isAuthenticated,
        createdAt: userProfile.createdAt,
        creatorId: userProfile.creatorId,
        modifierId: userProfile.modifierId,
        modifiedAt: userProfile.modifiedAt,
        deletedAt: userProfile.deletedAt,
        deletorId: userProfile.deletorId,
      });
      const birthdayDate = Utils.toDate(userProfile.birthday);
      if (birthdayDate == null) {
        throw new ErrorCustom(HttpStatus.BAD_REQUEST, 'Invalid birthday format');
      }
      newUserProfile.birthday = birthdayDate;

      switch (userProfile.gender) {
        case 'male':
          newUserProfile.gender = UserProfileGenderEnum.MALE;
          break;
        case 'female':
          newUserProfile.gender = UserProfileGenderEnum.FEMALE;
          break;
        default:
          newUserProfile.gender = UserProfileGenderEnum.OTHER;
          break;
      }

      const saved: UserProfilesModelChema | null =
        await this.userProfileRepo.save<UserProfilesModelChema>(newUserProfile);
      if (saved == null || !saved) {
        return 0;
      }
      return 1;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, error.message as string);
    }
  }
  async isExistProfile(account: string): Promise<boolean> {
    try {
      const userProfile = await this.userProfileRepo.findOne({
        where: {
          account: account,
        },
      });
      if (userProfile) {
        return true;
      }
      return false;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, error.message as string);
    }
  }
  async getOneByUsername(username: string): Promise<UserEntity> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = this.users.find((user) => user.account === username);
      if (!user) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }

      return new UserEntity({
        id: user.id,
        account: user.account,
        password: user.password,
        salt: user.salt,
        loginTime: user.loginTime,
        logoutTime: user.logoutTime,
        loginIp: user.loginIp,
      });
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async softDelete(id: string): Promise<number> {
    try {
      log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 1;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async save(user: UserEntity): Promise<number> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const lengthBefore = this.users.length;
      const lengthAfterPush = this.users.push(
        new UserEntity({
          id: user.id,
          account: user.account,
          password: user.password,
          salt: user.salt,
          loginTime: user.loginTime,
          logoutTime: user.logoutTime,
          loginIp: user.loginIp,
        }),
      );
      if (lengthBefore === lengthAfterPush) {
        return 0;
      }
      return 1;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async getOne(account: string): Promise<UserProfileEntity | null> {
    try {
      const userBase: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          account: account,
        },
      });
      if (userBase == null) {
        return null;
      }
      const userProfileModel: UserProfilesModelChema | null = await this.userProfileRepo.findOne({
        where: {
          account: account,
        },
      });
      if (userProfileModel == null) {
        return null;
      }
      const roles: RolesModelSchema[] = await MysqlDatasource.getInstance()
        .dataSource.getRepository(RolesModelSchema)
        .find({
          where: {
            users: {
              id: userBase.id,
            },
          },
          relations: ['permissions'],
        });

      const permissions: PermissionsModelSchema[] = [];
      for (const role of roles) {
        permissions.push(...role.permissions);
      }

      return new UserProfileEntity({
        id: userProfileModel.id,
        account: userProfileModel.account,
        avatar: userProfileModel.avatar,
        birthday: String(userProfileModel.birthday),
        email: userProfileModel.email,
        gender: userProfileModel.gender,
        mobile: userProfileModel.mobile,
        nickname: userProfileModel.nickname,
        state: userProfileModel.state,
        isAuthenticated: userProfileModel.isAuthenticated,
        createdAt: userProfileModel.createdAt,
        modifiedAt: userProfileModel.modifiedAt,
        deletedAt: userProfileModel.deletedAt,
      });
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
  async getManyAvalable(): Promise<UserEntity[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return this.users;
    } catch (error) {
      log(error);
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, HttpMessage.INTERNAL_SERVER_ERROR);
    }
  }
}
