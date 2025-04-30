import { Cascade, Entity, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from 'src/auth/domain/value-object/role.enum';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { ScrapEntity } from './scrap.entity';

@Entity({ tableName: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: 'varchar', unique: true })
  oauthId: string;

  @Property({ type: 'varchar', unique: true })
  email: string;

  @Property({ type: 'varchar' })
  role: Role;

  @OneToOne(() => AuthEntity, (auth) => auth.user, { unique: true })
  auth: AuthEntity;

  @OneToMany(() => ScrapEntity, (scrap) => scrap.user, { nullable: true, cascade: [Cascade.ALL] })
  scraps: ScrapEntity[];
}
