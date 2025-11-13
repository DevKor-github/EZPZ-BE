import { InjectRepository } from '@mikro-orm/nestjs';
import { OrganizationModel } from '../domain/organization.model';
import { OrganizationViewEntity } from './organization.view.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { OrganizationReader } from '../domain/organization.reader';

export class OrganizationReaderImpl implements OrganizationReader {
  constructor(
    @InjectRepository(OrganizationViewEntity)
    private readonly organizationOrmRepository: EntityRepository<OrganizationViewEntity>,
  ) {}

  async findById(organizationId: string): Promise<OrganizationModel> {
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
}
