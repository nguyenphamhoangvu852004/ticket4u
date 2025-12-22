import { BaseModelSchema } from '@/libs/typeorm/baseModelSchema';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserProfileGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('user_profiles')
export class UserProfilesModelChema extends BaseModelSchema {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ name: 'account', type: 'varchar', length: 50, nullable: false })
  account: string;

  @Column({ name: 'nickname', type: 'varchar', length: 50, nullable: false })
  nickname: string;

  @Column({ name: 'avatar', type: 'varchar', length: 50, nullable: false })
  avatar: string;

  @Column({ name: 'state', type: 'varchar', length: 2, nullable: false })
  state: string;

  @Column({ name: 'mobile', type: 'varchar', length: 15, nullable: false })
  mobile: string;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: UserProfileGenderEnum,
    default: UserProfileGenderEnum.OTHER,
    nullable: false,
  })
  gender: UserProfileGenderEnum;

  @Column({ name: 'birthday', type: 'date', nullable: false })
  birthday: Date;

  @Column({ name: 'is_authenticated', type: 'tinyint', nullable: false })
  isAuthenticated: number;

  constructor(parital?: Partial<UserProfilesModelChema>) {
    super();
    Object.assign(this, parital);
  }
}
