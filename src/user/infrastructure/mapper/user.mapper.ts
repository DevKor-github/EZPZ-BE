import { User } from 'src/user/domain/entity/user';
import { UserEntity } from '../orm-entity/user.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { ScrapEntity } from '../orm-entity/scrap.entity';

export const UserMapper = createMapper<User, UserEntity>(
  (entity: UserEntity): User => {
    return User.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      oauthId: entity.oauthId,
      email: entity.email,
      role: entity.role,
      authId: entity.auth.id,
      scrapIds: entity.scraps ? entity.scraps.map((scrap) => scrap.id) : [],
    });
  },
  (domain: User): UserEntity => {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.oauthId = domain.oauthId;
    entity.email = domain.email;
    entity.role = domain.role;

    // Relation Mapping
    if (domain.authId) {
      const authEntity = new AuthEntity();
      authEntity.id = domain.authId; // Assuming we have an `authId` in the domain model
      entity.auth = authEntity;
    }

    if (domain.scrapIds?.length) {
      entity.scraps = domain.scrapIds.map((scrapId) => {
        const scrapEntity = new ScrapEntity();
        scrapEntity.id = scrapId;
        return scrapEntity;
      });
    }
    return entity;
  },
);
