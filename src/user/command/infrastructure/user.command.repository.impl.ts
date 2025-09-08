import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from './user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { User } from '../domain/user';
import { UserMapper } from './user.mapper';
import { UserCommandRepository } from '../domain/user.command.repository';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class UserCommandRepositoryImpl implements UserCommandRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(user: User): Promise<void> {
    const userEntity = UserMapper.toEntity(user);
    await this.em.persistAndFlush(userEntity);
  }

  async deleteById(userId: string): Promise<void> {
    const userEntity = await this.ormRepository.findOne({ id: userId }, { populate: ['auth', 'scraps'] });
    if (!userEntity)
      throw new CustomException(
        CustomExceptionCode.USER_NOT_FOUND,
        `[UserCommandRepository] ${userId}에 해당하는 사용자가 존재하지 않습니다.`,
      );

    await this.em.removeAndFlush(userEntity);
  }
}
