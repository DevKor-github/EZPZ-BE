import { InjectRepository } from '@mikro-orm/nestjs';
import { OrganizationViewEntity } from './organization.view.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { OrganizationReader } from '../domain/organization.reader';
import { OrganizationView } from '../domain/organization.view';
import { OrganizationAdminView } from '../domain/organization.admin.view';

export class OrganizationReaderImpl implements OrganizationReader {
  constructor(
    @InjectRepository(OrganizationViewEntity)
    private readonly organizationOrmRepository: EntityRepository<OrganizationViewEntity>,
  ) {}

  async findById(organizationId: string): Promise<OrganizationView> {
    const qb = this.organizationOrmRepository.createQueryBuilder('o');

    qb.where({ id: organizationId });

    const organizationEntity = await qb.getSingleResult();

    if (!organizationEntity)
      throw new CustomException(
        CustomExceptionCode.ORGANIZATION_NOT_FOUND,
        `[OrganizationQueryRepository] ${organizationId}에 해당하는 기관이 존재하지 않습니다.`,
      );

    return {
      name: organizationEntity.name,
      contact: organizationEntity.contact,
    };
  }

  async findAll(): Promise<OrganizationAdminView[]> {
    const entities = await this.organizationOrmRepository.findAll();

    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      contact: entity.contact,
      createdAt: entity.createdAt,
    }));
  }
}
