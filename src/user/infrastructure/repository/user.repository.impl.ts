import { EntityRepository } from '@mikro-orm/mysql';
import { User } from 'src/user/domain/entity/user';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserMapper } from '../mapper/user.mapper';
import { UserEntity } from '../orm-entity/user.entity';
import { NotFoundException } from '@nestjs/common';

export class UserRepositoryImpl extends EntityRepository<UserEntity> implements UserRepository {
  async save(user: User): Promise<void> {
    const userEntity = UserMapper.toEntity(user);
    await this.em.persistAndFlush(userEntity);
  }

  async findById(userId: string): Promise<User | null> {
    const userEntity = await this.findOne({ id: userId });
    if (!userEntity) return null;

    return UserMapper.toDomain(userEntity);
  }

  async deleteById(userId: string): Promise<void> {
    const userEntity = await this.findOne({ id: userId }, { populate: ['auth', 'scraps'] });
    if (!userEntity) throw new NotFoundException('존재하지 않는 유저입니다.');

    await this.em.removeAndFlush(userEntity);
  }
}
