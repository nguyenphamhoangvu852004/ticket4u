import { RoleEntity } from '@/internal/auth/domain/entity/role.entity';
import { BaseEntity } from '@/utils/baseEntity';
import { UserProfileEntity } from './userProfile.entity';

export class UserEntity extends BaseEntity {
  id: string;
  account: string;
  password: string;
  salt: number;
  roles?: RoleEntity[];
  profile?: UserProfileEntity;
  loginTime: number;
  logoutTime: number;
  loginIp: string;

  constructor(parital?: Partial<UserEntity>) {
    super();
    Object.assign(this, parital);
  }
}
