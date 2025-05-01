import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class UserRepositoryImpl extends EntityRepository<User> implements UserRepository {
  async save(user: User): Promise<void> {
    await this.em.persistAndFlush(user);
  }
}
