import { UserVerificationsEntity } from '@/internal/auth/domain/entity/userVerifications.entity';
import { UserEntity } from '@/internal/user/domain/entity/user.entity';

export interface AuthRepositoryInterface {
  getOneByUsername(username: string): Promise<UserEntity>;
  getOneByUserId(userId: string): Promise<UserEntity | null>;
  getOneByEmailInVerifyTable(email: string): Promise<UserVerificationsEntity | null>;
  getOneByHashKey(hashKey: string): Promise<UserVerificationsEntity | null>;
  getOneByEmail(email: string): Promise<UserEntity | null>;
  saveOtp(object: UserVerificationsEntity): Promise<number>;
  saveOneUserInUsersTable(object: UserEntity): Promise<number>;
  updateOneVerifySuccessByEmailInVerifyTable(keyHash: string): Promise<number>;
  getInfoOTP(object: string): Promise<UserVerificationsEntity | null>;
  updatePasswordInUsersTable(userKey: string, newPassword: string): Promise<number>;
  updateLoginInfoInUsersTable(user: UserEntity): Promise<number>;
  saveRole(userId: string, roles: string[]): Promise<number>;
}
