import { Identifier } from 'src/shared/core/domain/identifier';
import { User } from '../domain/user';
import { UserEntity } from './user.entity';
import { UserAdminView } from '../domain/user.admin.view';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
    });
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.email = domain.email;

    return entity;
  }

  static toUserModel(domain: User): UserAdminView {
    return {
      id: domain.id.value,
      createdAt: domain.createdAt.toISOString(),
      email: domain.email,
    };
  }

  static toUserAdminModel(entity: UserEntity): UserAdminView {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      email: entity.email,
    };
  }
}
