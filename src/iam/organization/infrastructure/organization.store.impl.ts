import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Organization } from '../domain/organization';
import { OrganizationEntity } from './organization.entity';
import { OrganizationMapper } from './organization.mapper';
import { OrganizationStore } from '../domain/organization.store';

export class OrganizationStoreImpl implements OrganizationStore {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly ormRepository: EntityRepository<OrganizationEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(organization: Organization): Promise<void> {
    const entity = OrganizationMapper.toEntity(organization);
    await this.em.persistAndFlush(entity);
  }

  async deleteById(organizationId: string): Promise<void> {
    await this.em.nativeDelete(OrganizationEntity, { id: organizationId });
  }

  async updateById(organization: Organization): Promise<void> {
    await this.em.nativeUpdate(
      OrganizationEntity,
      { id: organization.id.value },
      {
        name: organization.name,
        contact: organization.contact,
        updatedAt: organization.updatedAt,
      },
    );
  }

  async loadById(organizationId: string): Promise<Organization | null> {
    const entity = await this.ormRepository.findOne({ id: organizationId });
    if (!entity) return null;

    return OrganizationMapper.toDomain(entity);
  }
}
