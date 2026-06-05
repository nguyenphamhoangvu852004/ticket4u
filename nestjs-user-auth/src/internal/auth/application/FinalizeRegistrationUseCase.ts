import { Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from '../domain/repository/auth.repository.interface';
import { UpdateRegistrateUserReqDto, UpdateRegistrateUserResDto } from './dto/updateRegistratePassword.dto';
import { Utils } from '@/utils/utils';
import { UserVerificationsEntity } from '../domain/entity/userVerifications.entity';
import { DatabaseError, ErrorCustom, InternalServerError } from '@/utils/ErrorCustom';
import { UserProfileEntity } from '@/internal/user/domain/entity/userProfile.entity';
import { randomUUID } from 'crypto';
import { UserRepositoryInterface } from '@/internal/user/domain/repository/user.repository.interface';

@Injectable()
export class FinalizeRegistrationUseCase {
  constructor(
    @Inject('AuthRepository') private readonly authRepo: AuthRepositoryInterface,
    @Inject('UserRepository') private readonly userRepo: UserRepositoryInterface,
  ) {}
  async execute(reqdata: UpdateRegistrateUserReqDto): Promise<UpdateRegistrateUserResDto> {
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
      if ((await this.userRepo.saveNewUserProfile(newUserProfile)) !== 1) {
        throw new DatabaseError('Error: save user profile');
      }
      return new UpdateRegistrateUserResDto('Update password successfully.', true);
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      }
      throw new InternalServerError();
    }
  }
}
