import { Cascade, Collection, Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { Role } from 'src/user/domain/value-object/role.enum';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { ScrapEntity } from '../../../scrap/infrastructure/orm-entity/scrap.entity';

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  email: string;

  @Property({ type: 'varchar' })
  role: Role;

  @OneToOne(() => AuthEntity, (auth) => auth.user, { unique: true })
  auth: AuthEntity;

  @OneToMany(() => ScrapEntity, (scrap) => scrap.user, { nullable: true, cascade: [Cascade.ALL] })
  scraps = new Collection<ScrapEntity>(this);
}
