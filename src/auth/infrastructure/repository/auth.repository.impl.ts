import { EntityRepository } from '@mikro-orm/mysql';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { AuthEntity } from '../orm-entity/auth.entity';

export class AuthRepositoryImpl extends EntityRepository<Auth> implements AuthRepository {
  async save(authEntity: AuthEntity): Promise<void> {
    await this.em.persistAndFlush(authEntity);
  }
}
