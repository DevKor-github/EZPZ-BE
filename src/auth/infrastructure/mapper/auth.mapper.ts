import { Auth } from 'src/auth/domain/entity/auth';
import { AuthEntity } from '../orm-entity/auth.entity';
import { Identifier } from 'src/shared/core/domain/value-object/identifier';
import { EntityManager } from '@mikro-orm/mysql';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

export class AuthMapper {
  static toDomain(entity: AuthEntity): Auth {
    return Auth.create({
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

  static toEntity(domain: Auth, em: EntityManager): AuthEntity {
    const entity = new AuthEntity();
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
