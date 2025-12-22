import { BaseModelSchema } from '@/libs/typeorm/baseModelSchema';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserVerificationTypeEnum {
  EMAIL = 'email',
  PHONE = 'phone',
}

@Entity('user_verifications')
export class UserVerificationsModelSchema extends BaseModelSchema {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ name: 'otp', type: 'varchar', length: 6, nullable: false })
  otp: string;

  @Column({ name: 'verification_key', type: 'varchar', length: 255, nullable: false })
  verificationKey: string;

  @Column({ name: 'key_hash', type: 'varchar', length: 255, nullable: false })
  keyHash: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserVerificationTypeEnum,
    default: UserVerificationTypeEnum.EMAIL,
    nullable: false,
  })
  type: UserVerificationTypeEnum;

  @Column({ name: 'is_verified', type: 'tinyint', nullable: false })
  isVerified: number;

  @Column({ name: 'is_deleted', type: 'tinyint', nullable: false })
  isDeleted: number;

  constructor(parital?: Partial<UserVerificationsModelSchema>) {
    super();
    Object.assign(this, parital);
  }
}
