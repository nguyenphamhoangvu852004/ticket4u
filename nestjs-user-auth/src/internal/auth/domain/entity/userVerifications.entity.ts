import { BaseEntity } from '@/utils/baseEntity';

export class UserVerificationsEntity extends BaseEntity {
  id: string;
  otp: string;
  verificationKey: string;
  keyHash: string;
  type: string;
  isVerified: number;
  isDeleted: number;

  constructor(patial?: Partial<UserVerificationsEntity>) {
    super();
    Object.assign(this, patial);
  }
}
