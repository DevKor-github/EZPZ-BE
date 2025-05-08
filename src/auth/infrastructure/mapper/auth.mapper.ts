import { Auth } from 'src/auth/domain/entity/auth';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { AuthEntity } from '../orm-entity/auth.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export const AuthMapper = createMapper<Auth, AuthEntity>(
  (entity: AuthEntity): Auth => {
    return Auth.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      refreshToken: entity.refreshToken,
      userId: Identifier.from(entity.user.id),
    });
  },
  (domain: Auth): AuthEntity => {
    const entity = new AuthEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.refreshToken = domain.refreshToken;
    entity.user = { id: domain.userId.value } as UserEntity;

    return entity;
  },
);
