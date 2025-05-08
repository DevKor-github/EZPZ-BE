import { User } from 'src/user/domain/entity/user';
import { UserEntity } from '../orm-entity/user.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { Identifier } from 'src/shared/domain/value-object/identifier';
export const UserMapper = createMapper<User, UserEntity>(
  (entity: UserEntity): User => {
    return User.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      oauthId: entity.oauthId,
      email: entity.email,
      role: entity.role,
      scrapIds: entity.scraps ? entity.scraps.map((scrap) => Identifier.from(scrap.id)) : [],
    });
  },
  (domain: User): UserEntity => {
    const entity = new UserEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.oauthId = domain.oauthId;
    entity.email = domain.email;
    entity.role = domain.role;

    return entity;
  },
);
