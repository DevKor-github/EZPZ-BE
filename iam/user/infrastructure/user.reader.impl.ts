import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { UserView } from '../domain/user.view';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { UserReader } from '../domain/user.reader';
import { UserEntity } from './user.entity';
import { UserAdminView } from '../domain/user.admin.view';
import { UserMapper } from './user.mapper';

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

  async findAllByCursor(pageSize: number, cursorId?: string, cursorDate?: Date): Promise<UserAdminView[]> {
    const qb = this.ormRepository.createQueryBuilder('u');

    if (cursorDate && cursorId) {
      qb.where({
        $or: [
          { createdAt: { $lt: cursorDate } },
          {
            $and: [{ createdAt: cursorDate }, { id: { $lt: cursorId } }],
          },
        ],
      });
    }

    qb.orderBy({ createdAt: 'DESC', id: 'DESC' }).limit(pageSize + 1);

    const result = await qb.getResultList();

    return result.map((user) => UserMapper.toUserAdminModel(user));
  }
}
