export abstract class BaseEntity {
  creatorId: string;
  modifierId: string;
  deletorId: string;
  createdAt: number;
  modifiedAt: number;
  deletedAt: number;

  constructor(parial?: Partial<BaseEntity>) {
    Object.assign(this, parial);
  }

  markCreated(creatorId: string) {
    this.creatorId = creatorId;
    this.createdAt = Date.now();
    this.modifierId = creatorId;
    this.modifiedAt = Date.now();
    this.deletedAt = 0;
    this.deletorId = '';
  }

  markUpdated(modifierId: string) {
    this.modifierId = modifierId;
    this.modifiedAt = Date.now();
  }

  markDeleted(deletorId: string) {
    this.deletorId = deletorId;
    this.deletedAt = Date.now();
  }
}
