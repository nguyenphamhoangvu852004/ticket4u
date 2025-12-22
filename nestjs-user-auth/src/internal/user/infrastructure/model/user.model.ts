'use strict';
import { RolesModelSchema } from '@/internal/auth/infrastructure/model/roles.model';
import { BaseModelSchema } from '@/libs/typeorm/baseModelSchema';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserModelSchema extends BaseModelSchema {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ name: 'account', type: 'varchar', length: 50, nullable: false })
  account: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'salt', type: 'tinyint', nullable: true })
  salt: number;

  @Column({ name: 'login_time', type: 'bigint', nullable: true })
  loginTime: number;

  @Column({ name: 'logout_time', type: 'bigint', nullable: true })
  logoutTime: number;

  @Column({ name: 'login_ip', type: 'varchar', length: 100, nullable: true })
  loginIp: string;

  @ManyToMany(() => RolesModelSchema, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RolesModelSchema[];

  constructor(parital?: Partial<UserModelSchema>) {
    super();
    Object.assign(this, parital);
  }
}
