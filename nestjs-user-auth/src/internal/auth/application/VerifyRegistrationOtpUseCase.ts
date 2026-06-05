import { Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { Utils } from '@/utils/utils';
import { VerifyRegistrateUserReqDto, VerifyRegistrateUserResDto } from './dto/verify.dto';
import { RedisDatasource } from '@/datasource/redis.datasource';
import { UserVerificationsEntity } from '../domain/entity/userVerifications.entity';
import { randomUUID } from 'crypto';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';

@Injectable()
export class VerifyRegistrationOtpUseCase {
  constructor(@Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface) {}

  async execute(reqData: VerifyRegistrateUserReqDto): Promise<VerifyRegistrateUserResDto> {
    try {
      const verifyKeyHashed = Utils.hashString(reqData.verifyKey.toLowerCase());
      const userKey = Utils.createUserKey(verifyKeyHashed);

      // tìm trong otp trong cache
      let otpInSystem: string | null = await RedisDatasource.getInstance().dataSource.get(userKey);
      let userInVerifyTable: UserVerificationsEntity | null;

      // nếu mà ko có thì phải gọi trong database để móc cái otp đã được gửi đi
      if (otpInSystem == null) {
        userInVerifyTable = await this.authRepo.getOneByHashKeyAndOTP(userKey, reqData.otp);
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
      if ((await this.authRepo.updateOneVerifySuccessByEmailInVerifyTable(userKey, reqData.otp)) != 1) {
        throw new DatabaseError('Error: update one by email in verify table');
      }

      // xoá trong redis
      if ((await Utils.deleteRedisData(userKey)) != 1) {
        throw new DatabaseError('Error: delete redis data');
      }

      // tạo role , lưu role
      if ((await this.authRepo.saveRole(newUUIDUser, ['2'])) != 1) {
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
}
