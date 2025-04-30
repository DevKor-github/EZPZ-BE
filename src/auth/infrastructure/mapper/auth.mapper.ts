import { Auth } from 'src/auth/domain/entity/auth';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { AuthEntity } from '../orm-entity/auth.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';

export const AuthMapper = createMapper<Auth, AuthEntity>(
  (entity: AuthEntity): Auth => {
    return Auth.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      refreshToken: entity.refreshToken,
      userId: entity.user.id,
    });
  },
  (domain: Auth): AuthEntity => {
    const entity = new AuthEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.refreshToken = domain.refreshToken;
    entity.user = { id: domain.userId } as UserEntity;

    return entity;
  },
);
