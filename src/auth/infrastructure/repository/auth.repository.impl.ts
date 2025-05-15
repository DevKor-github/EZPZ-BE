import { EntityRepository } from '@mikro-orm/mysql';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { AuthMapper } from '../mapper/auth.mapper';
import { AuthEntity } from '../orm-entity/auth.entity';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

export class AuthRepositoryImpl extends EntityRepository<AuthEntity> implements AuthRepository {
  async save(auth: Auth): Promise<void> {
    const authEntity = AuthMapper.toEntity(auth, this.em);
    await this.em.persistAndFlush(authEntity);
  }

  async findByOAuthIdandProvider(oauthId: string, provider: OAuthProviderType): Promise<Auth | null> {
    const authEntity = await this.findOne({ oauthId, provider });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }

  async findByRefreshToken(refreshToken: string): Promise<Auth | null> {
    const authEntity = await this.findOne({ refreshToken });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }

  async update(auth: Auth): Promise<void> {
    await this.em.nativeUpdate(
      AuthEntity,
      { id: auth.id.value },
      {
        refreshToken: auth.refreshToken,
        updatedAt: auth.updatedAt,
      },
    );
  }

  async findByUserId(userId: string): Promise<Auth | null> {
    const authEntity = await this.findOne({ user: userId });
    if (!authEntity) return null;

    return AuthMapper.toDomain(authEntity);
  }
}
