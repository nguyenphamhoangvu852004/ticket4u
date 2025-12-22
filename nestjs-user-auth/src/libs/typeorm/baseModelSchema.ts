import { Column } from 'typeorm';

export abstract class BaseModelSchema {
  @Column({ name: 'creator_id', type: 'varchar', length: 36, nullable: false })
  creatorId: string;

  @Column({ name: 'modifier_id', type: 'varchar', length: 36, nullable: false })
  modifierId: string;

  @Column({ name: 'deletor_id', type: 'varchar', length: 36, nullable: true })
  deletorId?: string;

  @Column({ name: 'created_at', type: 'bigint', nullable: false })
  createdAt: number;

  @Column({ name: 'modified_at', type: 'bigint', nullable: false })
  modifiedAt: number;

  @Column({ name: 'deleted_at', type: 'bigint', nullable: true })
  deletedAt?: number;

  constructor(patial?: Partial<BaseModelSchema>) {
    Object.assign(this, patial);
  }
}
