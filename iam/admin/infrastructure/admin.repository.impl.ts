import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Admin } from '../domain/admin';
import { AdminRepository } from '../domain/admin.repository';
import { AdminMapper } from './admin.mapper';
import { AdminEntity } from './admin.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class AdminRepositoryImpl implements AdminRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly ormRepository: EntityRepository<AdminEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(admin: Admin): Promise<void> {
    const entity = AdminMapper.toEntity(admin);
    await this.em.persistAndFlush(entity);
  }

  async loadById(id: string): Promise<Admin> {
    const entity = await this.ormRepository.findOne({ id });
    if (!entity) throw new CustomException(CustomExceptionCode.ADMIN_NOT_FOUND);

    return AdminMapper.toDomain(entity);
  }
}
