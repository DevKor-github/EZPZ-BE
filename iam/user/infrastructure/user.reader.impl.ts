import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { UserView } from '../domain/user.view';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { UserReader } from '../domain/user.reader';
import { UserEntity } from './user.entity';

export class UserReaderImpl implements UserReader {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(userId: string): Promise<UserView> {
    const userEntity = await this.ormRepository
      .createQueryBuilder('u')
      .select(['id', 'email'])
      .where({ id: userId })
      .getSingleResult();

    if (!userEntity)
      throw new CustomException(
        CustomExceptionCode.USER_NOT_FOUND,
        `[UserQueryRepository] ${userId}에 해당하는 사용자가 존재하지 않습니다.`,
      );

    return { email: userEntity.email };
  }
}
