/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { MysqlDatasource } from '@/datasource/mysql.datasource';
import { PermissionEntity } from '@/internal/auth/domain/entity/permission.entity';
import { RoleEntity } from '@/internal/auth/domain/entity/role.entity';
import { UserVerificationsEntity } from '@/internal/auth/domain/entity/userVerifications.entity';
import { AuthRepositoryInterface } from '@/internal/auth/domain/repository/auth.repository.interface';
import {
  UserVerificationsModelSchema,
  UserVerificationTypeEnum,
} from '@/internal/auth/infrastructure/model/userVerifications.model';
import { HttpMessage } from '@/internal/global/ResponseData';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserModelSchema } from '@/internal/user/infrastructure/model/user.model';
import { DatabaseError, ErrorCustom } from '@/utils/ErrorCustom';
import { HttpStatus, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AuthRepositoryImplementation implements AuthRepositoryInterface {
  private userVerifyRepo: Repository<UserVerificationsModelSchema>;
  private userRepo: Repository<UserModelSchema>;
  constructor() {
    this.userVerifyRepo = MysqlDatasource.getInstance().dataSource.getRepository(UserVerificationsModelSchema);
    this.userRepo = MysqlDatasource.getInstance().dataSource.getRepository(UserModelSchema);
  }
  async getOneByUserId(userId: string): Promise<UserEntity | null> {
    try {
      const user: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          id: userId,
        },
        relations: ['roles', 'roles.permissions'],
      });
      if (user == null) {
        return null;
      }
      const newUserBase = new UserEntity({
        id: user.id,
        account: user.account,
        password: user.password,
        salt: user.salt,
        loginTime: user.loginTime,
        logoutTime: user.logoutTime,
        loginIp: user.loginIp,
      });
      if (user.roles && user.roles.length > 0) {
        const roles: RoleEntity[] = [];
        for (const role of user.roles) {
          const permissions: PermissionEntity[] = [];
          for (const permission of role.permissions) {
            permissions.push(
              new PermissionEntity({ id: permission.id, name: permission.permission, resource: permission.resource }),
            );
          }
          roles.push(new RoleEntity({ id: role.id, name: role.name, permissions: permissions })); // tạo role entity
        }
        newUserBase.roles = roles;
      }
      return newUserBase;
    } catch (error: unknown) {
      console.error('Repository error at getOneByUserId:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async saveRole(userId: string, rolesId: string[]): Promise<number> {
    try {
      const insertedResult = await MysqlDatasource.getInstance()
        .dataSource.getRepository('user_roles')
        .insert(
          rolesId.map((id) => ({
            user_id: userId,
            role_id: id,
          })),
        );
      if (insertedResult.identifiers.length === 0) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at saveRole:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async updateLoginInfoInUsersTable(user: UserEntity): Promise<number> {
    try {
      const found: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          id: user.id,
        },
      });
      if (found == null) {
        throw new DatabaseError('Error: user not found');
      }
      const result: UpdateResult = await this.userRepo.update(found.id, {
        loginTime: user.loginTime,
        loginIp: user.loginIp,
        modifiedAt: Date.now(),
        modifierId: 'system',
      });
      if (result.affected == 0) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at updateLoginInfoInUsersTable:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async updatePasswordInUsersTable(userKey: string, newPassword: string): Promise<number> {
    try {
      const found: UserVerificationsModelSchema | null = await this.userVerifyRepo.findOne({
        where: {
          keyHash: userKey,
        },
      });
      log(found);
      if (found == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }
      const result: UpdateResult = await this.userRepo.update(
        {
          account: found.verificationKey,
        },
        {
          password: newPassword,
          modifiedAt: Date.now(),
          modifierId: 'system',
        },
      );
      log(result);
      if (result.affected == 0) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at updatePasswordInUsersTable:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async getInfoOTP(object: string): Promise<UserVerificationsEntity | null> {
    try {
      const user: UserVerificationsModelSchema | null = await this.userVerifyRepo.findOne({
        where: {
          keyHash: object,
        },
      });
      if (user == null) {
        return null;
      }
      return new UserVerificationsEntity({
        id: user.id,
        keyHash: user.keyHash,
        otp: user.otp,
        verificationKey: user.verificationKey,
        isDeleted: user.isDeleted,
        isVerified: user.isVerified,
        type: user.type,
        createdAt: user.createdAt,
        modifiedAt: user.modifiedAt,
        deletedAt: user.deletedAt,
        creatorId: user.creatorId,
        modifierId: user.modifierId,
        deletorId: user.deletorId,
      });
    } catch (error: unknown) {
      console.error('Repository error at getInfoOTP:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async getOneByHashKey(hashKey: string): Promise<UserVerificationsEntity | null> {
    try {
      const user: UserVerificationsModelSchema | null = await this.userVerifyRepo.findOne({
        where: {
          keyHash: hashKey,
        },
      });
      if (user == null) {
        return null;
      }
      return new UserVerificationsEntity({
        id: user.id,
        otp: user.otp,
        verificationKey: user.verificationKey,
        isDeleted: user.isDeleted,
        isVerified: user.isVerified,
        keyHash: user.keyHash,
        type: user.type,
      });
    } catch (error: unknown) {
      console.error('Repository error at getOneByHashKey:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async updateOneVerifySuccessByEmailInVerifyTable(keyHash: string): Promise<number> {
    try {
      const found: UserVerificationsModelSchema | null = await this.userVerifyRepo.findOne({
        where: {
          keyHash: keyHash,
        },
      });
      if (found == null) {
        throw new ErrorCustom(HttpStatus.NOT_FOUND, HttpMessage.NOT_FOUND);
      }
      const result: UpdateResult = await this.userVerifyRepo.update(found.id, {
        isVerified: 1,
        isDeleted: 1,
        modifiedAt: Date.now(),
        modifierId: 'system',
      });
      if (result.affected == 0) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at updateOneVerifySuccessByEmailInVerifyTable:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async saveOneUserInUsersTable(object: UserEntity): Promise<number> {
    try {
      const savedUser: UserModelSchema | null = await this.userRepo.save<UserModelSchema>(
        new UserModelSchema({
          id: object.id,
          account: object.account,
          password: object.password,
          salt: object.salt,
          loginTime: object.loginTime,
          logoutTime: object.logoutTime,
          loginIp: object.loginIp,
          creatorId: object.creatorId,
          modifierId: object.modifierId,
          deletorId: object.deletorId,
          createdAt: object.createdAt,
          modifiedAt: object.modifiedAt,
          deletedAt: object.deletedAt,
        }),
        {
          transaction: true,
        },
      );
      if (savedUser == null || !savedUser) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at saveOneUserInUsersTable:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async saveOtp(object: UserVerificationsEntity): Promise<number> {
    try {
      const savedOtp: UserVerificationsModelSchema | null =
        await this.userVerifyRepo.save<UserVerificationsModelSchema>(
          new UserVerificationsModelSchema({
            id: object.id,
            otp: object.otp,
            verificationKey: object.verificationKey,
            keyHash: object.keyHash,
            type:
              object.type == UserVerificationTypeEnum.EMAIL
                ? UserVerificationTypeEnum.EMAIL
                : UserVerificationTypeEnum.PHONE,
            isDeleted: object.isDeleted,
            isVerified: object.isVerified,
            createdAt: object.createdAt,
            modifiedAt: object.modifiedAt,
            deletedAt: object.deletedAt,
            creatorId: object.creatorId,
            modifierId: object.modifierId,
            deletorId: object.deletorId,
          }),
          {
            transaction: true,
          },
        );
      if (savedOtp == null || !savedOtp) {
        return 0;
      }
      return 1;
    } catch (error: unknown) {
      console.error('Repository error at saveOtp:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async getOneByEmailInVerifyTable(email: string): Promise<UserVerificationsEntity | null> {
    try {
      const user: UserVerificationsModelSchema | null = await this.userVerifyRepo.findOne({
        where: {
          keyHash: email,
          isDeleted: 0,
        },
      });
      if (user == null) {
        return null;
      }
      return new UserVerificationsEntity({
        id: user.id,
        otp: user.otp,
        verificationKey: user.verificationKey,
        isDeleted: user.isDeleted,
        isVerified: user.isVerified,
        keyHash: user.keyHash,
        type: user.type,
      });
    } catch (error: unknown) {
      console.error('Repository error at getOneByEmailInVerifyTable:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async getOneByUsername(username: string): Promise<UserEntity> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return new UserEntity({
        id: '1',
        account: username,
        password: '123456',
        salt: 1,
        loginTime: 1,
        logoutTime: 1,
        loginIp: '127.0.0.1',
      });
    } catch (error: unknown) {
      console.error('Repository error at getOneByUsername:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async getOneByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user: UserModelSchema | null = await this.userRepo.findOne({
        where: {
          account: email,
        },
      });
      if (user == null) {
        return null;
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
    } catch (error: unknown) {
      console.error('Repository error at getOneByEmail:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
  async isExistByEmail(email: string): Promise<boolean> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error: unknown) {
      console.error('Repository error at isExistByEmail:', error);
      if (error instanceof ErrorCustom) throw error;
      const message = error instanceof Error ? error.message : 'Internal server error';
      throw new ErrorCustom(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
  }
}
