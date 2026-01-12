import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'admin' })
export class AdminEntity extends BaseEntity {
  @Property({ type: 'varchar' })
  name: string;
}
