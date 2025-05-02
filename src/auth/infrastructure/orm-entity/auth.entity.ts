import { Cascade, Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { AuthRepositoryImpl } from '../repository/auth.repository.impl';

@Entity({ tableName: 'auth', repository: () => AuthRepositoryImpl })
export class AuthEntity extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ type: 'varchar', unique: true })
  refreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.auth, {
    owner: true,
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
    unique: true,
  })
  user: UserEntity;
}
