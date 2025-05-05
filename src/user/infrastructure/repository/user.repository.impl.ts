import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../orm-entity/user.entity';

export class UserRepositoryImpl extends EntityRepository<UserEntity> implements UserRepository {
  async save(user: User): Promise<void> {
    const userEntity = UserMapper.toEntity(user);
    await this.em.persistAndFlush(userEntity);
  }
}
