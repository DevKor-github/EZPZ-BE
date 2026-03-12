import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'auth_admin' })
@Unique({ properties: ['accountId'] })
export class AuthAdminEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  accountId: string;

  @Property({ type: 'varchar' })
  passwordHash: string;

  @Property({ type: 'varchar' })
  adminId: string;

  @Property({ type: 'boolean' })
  isDeleted: boolean;

  @Property({ type: 'datetime', nullable: true })
  deletedAt: Date | null;
}
