import { InjectRepository } from '@mikro-orm/nestjs';
import { AuthAdminEntity } from './auth-admin.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { AuthAdminRepository } from '../domain/auth-admin.repository';
import { AuthAdmin } from '../domain/auth-admin';
import { AuthAdminMapper } from './auth-admin.mapper';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class AuthAdminRepositoryImpl implements AuthAdminRepository {
  constructor(
    @InjectRepository(AuthAdminEntity)
    private readonly ormRepository: EntityRepository<AuthAdminEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(authAdmin: AuthAdmin): Promise<void> {
    const entity = AuthAdminMapper.toEntity(authAdmin);
    await this.em.persistAndFlush(entity);
  }

  async loadById(id: string): Promise<AuthAdmin> {
    const entity = await this.ormRepository.findOne({ id });
    if (!entity) throw new CustomException(CustomExceptionCode.AUTH_ADMIN_NOT_FOUND);

    return AuthAdminMapper.toDomain(entity);
  }

  async loadByAccountId(accountId: string): Promise<AuthAdmin | null> {
    const entity = await this.ormRepository.findOne({ accountId });
    if (!entity) return null;

    return AuthAdminMapper.toDomain(entity);
  }
}
