import { EntityRepository } from '@mikro-orm/mysql';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { AuthMapper } from '../mapper/auth.mapper';
import { AuthEntity } from '../orm-entity/auth.entity';

export class AuthRepositoryImpl extends EntityRepository<AuthEntity> implements AuthRepository {
  async save(auth: Auth): Promise<void> {
    const authEntity = AuthMapper.toEntity(auth);
    await this.em.persistAndFlush(authEntity);
  }
}
