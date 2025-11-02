import { Cascade, Collection, Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { AuthUserEntity } from 'src/auth/auth-user/infrasturcture/auth-user.entity';
import { ScrapEntity } from 'src/scrap/command/infrastructure/scrap.entity';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';
import { Role } from '../domain/value-object/role.enum';

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  email: string;

  @Property({ type: 'varchar' })
  role: Role;

  @OneToOne(() => AuthUserEntity, (authUser) => authUser.user, { unique: true })
  authUser: AuthUserEntity;

  @OneToMany(() => ScrapEntity, (scrap) => scrap.user, { nullable: true, cascade: [Cascade.ALL] })
  scraps = new Collection<ScrapEntity>(this);
}
