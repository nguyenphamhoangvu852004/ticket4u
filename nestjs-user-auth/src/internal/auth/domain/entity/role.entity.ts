import { PermissionEntity } from '@/internal/auth/domain/entity/permission.entity';

export class RoleEntity {
  id: number;
  name: string;
  permissions: PermissionEntity[];
  constructor(patial?: Partial<RoleEntity>) {
    Object.assign(this, patial);
  }
}
