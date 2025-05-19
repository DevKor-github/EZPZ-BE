import { Cascade, Entity, OneToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { AuthRepositoryImpl } from '../repository/auth.repository.impl';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

@Entity({ tableName: 'auth', repository: () => AuthRepositoryImpl })
@Unique({ properties: ['oauthId', 'provider'] })
export class AuthEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  oauthId: string;

  @Property({ type: 'varchar' })
  provider: OAuthProviderType;

  @Property({ type: 'varchar', unique: true, nullable: true })
  refreshToken: string | null;

  @OneToOne(() => UserEntity, (user) => user.auth, {
    owner: true,
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
    unique: true,
  })
  user: UserEntity;
}
