import { Identifier } from 'src/shared/core/domain/identifier';
import { Organization } from '../domain/organization';
import { OrganizationEntity } from './organization.entity';

export class OrganizationMapper {
  static toDomain(entity: OrganizationEntity): Organization {
    return Organization.create({
      id: Identifier.from(entity.id),
      name: entity.name,
      contact: entity.contact,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(domain: Organization): OrganizationEntity {
    const entity = new OrganizationEntity();
    entity.id = domain.id.value;
    entity.name = domain.name;
    entity.contact = domain.contact;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
