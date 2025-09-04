import { InjectRepository } from '@mikro-orm/nestjs';
import { UserQueryRepository } from '../domain/user.query.repository';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { UserModel } from '../domain/user.model';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class UserQueryRepositoryImpl implements UserQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(userId: string): Promise<UserModel> {
    const userEntity = await this.ormRepository
      .createQueryBuilder('u')
      .select(['id', 'email'])
      .where({ id: '1' })
      .getSingleResult();

    if (!userEntity)
      throw new CustomException(
        CustomExceptionCode.USER_NOT_FOUND,
        `[UserQueryRepository] ${userId}에 해당하는 사용자가 존재하지 않습니다.`,
      );

    return { email: userEntity.email };
  }
}
