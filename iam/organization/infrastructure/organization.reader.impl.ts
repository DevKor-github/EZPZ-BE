import { InjectRepository } from '@mikro-orm/nestjs';
import { OrganizationViewEntity } from './organization.view.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { OrganizationReader } from '../domain/organization.reader';
import { OrganizationView } from '../domain/organization.view';
import { OrganizationAdminView } from '../domain/organization.admin.view';
import { OrganizationMapper } from './organization.mapper';

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

  async findAllByCursor(pageSize: number, cursorId?: string, cursorDate?: Date): Promise<OrganizationAdminView[]> {
    const qb = this.organizationOrmRepository.createQueryBuilder('o');

    if (cursorDate && cursorId) {
      qb.where({
        $or: [
          { createdAt: { $lt: cursorDate } },
          {
            $and: [{ createdAt: cursorDate }, { id: { $lt: cursorId } }],
          },
        ],
      });
    }

    qb.orderBy({ createdAt: 'DESC', id: 'DESC' }).limit(pageSize + 1);

    const result = await qb.getResultList();

    return result.map((org) => OrganizationMapper.toOrganizationAdminModel(org));
  }
}
