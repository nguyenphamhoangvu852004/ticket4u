import { RolesModelSchema } from '@/internal/auth/infrastructure/model/roles.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class PermissionsModelSchema {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'perrmission', type: 'varchar', length: 10, nullable: false })
  permission: string;
  @Column({ name: 'resource', type: 'varchar', length: 255, nullable: false })
  resource: string;

  @ManyToMany(() => RolesModelSchema, (role) => role.permissions)
  roles: RolesModelSchema[];
  constructor(partial?: Partial<PermissionsModelSchema>) {
    Object.assign(this, partial);
  }
}
