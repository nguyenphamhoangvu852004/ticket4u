import { UserEntity } from '@/internal/user/domain/entity/user.entity';
import { UserProfileEntity } from '@/internal/user/domain/entity/userProfile.entity';

export interface UserRepositoryInterface {
  getManyAvalable(): Promise<UserEntity[]>;
  getOne(account: string): Promise<UserProfileEntity | null>;
  getOneByUserKey(account: string): Promise<UserEntity | null>;
  getOneByUsername(username: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<number>;
  saveNewUserProfile(userProfile: UserProfileEntity): Promise<number>;
  softDelete(id: string): Promise<number>;
  isExistProfile(account: string): Promise<boolean>;
  changePassword(userKey: string, password: string): Promise<number>;
  updateUserProfile(userProfileEntity: UserProfileEntity): Promise<number>;
}
