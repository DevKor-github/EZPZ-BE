import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'organization' })
export class OrganizationEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  name: string;

  @Property({ type: 'varchar' })
  contact: string;
}
