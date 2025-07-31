import { Identifier } from 'src/shared/core/domain/identifier';
import { User } from '../domain/user';
import { UserEntity } from './user.entity';

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
