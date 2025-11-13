import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/shared/core/infrastructure/orm-entity/base.entity';
import { OAuthProviderType } from 'src/auth/auth-user/domain/value-object/oauth-provider.enum';

@Entity({ tableName: 'auth' })
@Unique({ properties: ['oauthId', 'provider'] })
export class AuthUserEntity extends BaseEntity {
  @Property({ type: 'varchar', unique: true })
  oauthId: string;

  @Property({ type: 'varchar' })
  provider: OAuthProviderType;

  @Property({ type: 'varchar', unique: true, nullable: true })
  refreshToken: string | null;

  @Property({ type: 'varchar', unique: true, nullable: true })
  oauthAccessToken: string | null;

  @Property({ type: 'varchar', unique: true })
  userId: string;
}
