import { AuthUser } from 'src/auth/auth-user/domain/auth-user';
import { Identifier } from 'src/shared/core/domain/identifier';
import { AuthUserEntity } from './auth-user.entity';

export class AuthUserMapper {
  static toDomain(entity: AuthUserEntity): AuthUser {
    return AuthUser.of({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      oauthId: entity.oauthId,
      provider: entity.provider,
      refreshToken: entity.refreshToken,
      oauthAccessToken: entity.oauthAccessToken,
      userId: Identifier.from(entity.userId),
    });
  }

  static toEntity(domain: AuthUser): AuthUserEntity {
    const entity = new AuthUserEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.oauthId = domain.oauthId;
    entity.provider = domain.provider;
    entity.refreshToken = domain.refreshToken;
    entity.oauthAccessToken = domain.oauthAccessToken;
    entity.userId = domain.userId.value;

    return entity;
  }
}
