import { InjectRepository } from '@mikro-orm/nestjs';
import { UserQueryRepository } from '../domain/user.query.repository';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { UserModel } from '../domain/user.model';

export class UserQueryRepositoryImpl implements UserQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly ormRepository: EntityRepository<UserEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(userId: string): Promise<UserModel | null> {
    const userEntity = await this.ormRepository
      .createQueryBuilder('u')
      .select(['id', 'email'])
      .where({ id: userId })
      .getSingleResult();

    if (!userEntity) return null;

    return { email: userEntity.email };
  }
}
