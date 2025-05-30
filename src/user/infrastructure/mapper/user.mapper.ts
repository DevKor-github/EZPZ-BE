import { User } from 'src/user/domain/entity/user';
import { UserEntity } from '../orm-entity/user.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      role: entity.role,
    });
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.email = domain.email;
    entity.role = domain.role;

    return entity;
  }
}
