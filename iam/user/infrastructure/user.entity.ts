import { Cascade, Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { ScrapEntity } from 'src/scrap/command/infrastructure/scrap.entity';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  email: string;

  @OneToMany(() => ScrapEntity, (scrap) => scrap.user, { nullable: true, cascade: [Cascade.ALL] })
  scraps = new Collection<ScrapEntity>(this);
}
