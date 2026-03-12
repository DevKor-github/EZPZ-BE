import { Identifier } from 'src/shared/core/domain/identifier';
import { Admin } from '../domain/admin';
import { AdminEntity } from './admin.entity';

export class AdminMapper {
  static toDomain(entity: AdminEntity): Admin {
    return Admin.create({
      id: Identifier.from(entity.id),
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: Admin): AdminEntity {
    const entity = new AdminEntity();
    entity.id = domain.id.value;
    entity.name = domain.name;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
