import { UserModelSchema as UserModelSchema } from '@/internal/user/infrastructure/model/user.model';
import { BaseModelSchema } from '@/libs/typeorm/baseModelSchema';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

export enum AuthTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

@Entity('user_two_factor_auths')
export class UserTwoFacrotAuthsModelSchema extends BaseModelSchema {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ name: 'auth_type', type: 'enum', enum: AuthTypeEnum, default: AuthTypeEnum.EMAIL, nullable: false })
  authType: AuthTypeEnum;

  @Column({ name: 'auth_secret', type: 'varchar', length: 255, nullable: false })
  authSecret: string;

  @Column({ name: 'email', type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'is_active', type: 'tinyint', default: 0, nullable: false })
  isActive: number;

  @OneToOne(() => UserModelSchema)
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'fk_user_two_factor_auths_user_id',
    referencedColumnName: 'id',
  })
  user?: UserModelSchema;

  constructor(parital?: Partial<UserTwoFacrotAuthsModelSchema>) {
    super();
    Object.assign(this, parital);
  }
}
