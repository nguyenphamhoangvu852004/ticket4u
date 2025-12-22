export class PermissionEntity {
  id: number;
  name: string;
  resource: string;
  constructor(patial?: Partial<PermissionEntity>) {
    Object.assign(this, patial);
  }
}
