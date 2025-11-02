import { AuthUser } from 'src/auth/auth-user/domain/auth-user';
import { Identifier } from 'src/shared/core/domain/identifier';
import { EntityManager } from '@mikro-orm/mysql';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
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
      userId: Identifier.from(entity.user.id),
    });
  }

  static toEntity(domain: AuthUser, em: EntityManager): AuthUserEntity {
    const entity = new AuthUserEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.oauthId = domain.oauthId;
    entity.provider = domain.provider;
    entity.refreshToken = domain.refreshToken;
    entity.oauthAccessToken = domain.oauthAccessToken;
    entity.user = em.getReference(UserEntity, domain.userId.value);

    return entity;
  }
}
