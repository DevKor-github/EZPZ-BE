import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Organization } from '../domain/organization';
import { OrganizationEntity } from './organization.entity';
import { OrganizationMapper } from './organization.mapper';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
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
    const entity = await this.ormRepository.findOne({ id: organizationId });
    if (!entity)
      throw new CustomException(
        CustomExceptionCode.ORGANIZATION_NOT_FOUND,
        `[OrganizationCommandRepository] ${organizationId}에 해당하는 기관이 존재하지 않습니다.`,
      );
  }
}
