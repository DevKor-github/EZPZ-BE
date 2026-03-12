import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'auth_organization' })
@Unique({ properties: ['accountId'] })
export class AuthOrganizationEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  accountId: string;

  @Property({ type: 'varchar' })
  passwordHash: string;

  @Property({ type: 'varchar', nullable: true })
  refreshToken: string | null;

  @Property({ type: 'varchar' })
  organizationId: string;

  @Property({ type: 'boolean' })
  isDeleted: boolean;

  @Property({ type: 'datetime', nullable: true })
  deletedAt: Date | null;
}
