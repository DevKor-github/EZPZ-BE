import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserEntity } from '../orm-entity/user.entity';

export class UserRepositoryImpl extends EntityRepository<User> implements UserRepository {
  async save(user: UserEntity): Promise<void> {
    await this.em.persistAndFlush(user);
  }
}
