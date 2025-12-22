import { PermissionsModelSchema } from '@/internal/auth/infrastructure/model/permissions.model';
import { UserModelSchema } from '@/internal/user/infrastructure/model/user.model';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RolesModelSchema {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 10, nullable: false })
  name: string;

  // Many-to-many với Permission
  @ManyToMany(() => PermissionsModelSchema, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions', // ⚡️ đặt tên bảng join rõ ràng
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionsModelSchema[];

  // Many-to-many với User
  @ManyToMany(() => UserModelSchema, (user) => user.roles)
  users: UserModelSchema[];

  constructor(partial?: Partial<RolesModelSchema>) {
    Object.assign(this, partial);
  }
}
