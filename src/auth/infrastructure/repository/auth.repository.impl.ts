import { EntityRepository } from '@mikro-orm/mysql';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';

export class AuthRepositoryImpl extends EntityRepository<Auth> implements AuthRepository {
  async save(auth: Auth): Promise<void> {
    await this.em.persistAndFlush(auth);
  }
}
