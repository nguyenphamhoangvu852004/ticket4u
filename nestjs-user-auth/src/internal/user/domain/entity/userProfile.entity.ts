import { BaseEntity } from '@/utils/baseEntity';

export class UserProfileEntity extends BaseEntity {
  id: string;
  account: string;
  nickname: string;
  avatar: string;
  state: string;
  mobile: string;
  gender: string;
  birthday: string;
  email: string;
  isAuthenticated: number;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;

  constructor(parital?: Partial<UserProfileEntity>) {
    super();
    Object.assign(this, parital);
  }
}
