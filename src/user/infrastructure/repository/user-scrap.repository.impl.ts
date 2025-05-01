import { EntityRepository } from '@mikro-orm/mysql';
import { UserScrap } from 'src/user/domain/entity/user-scrap';
import { UserScrapRepository } from 'src/user/domain/repository/user-scrap.repository';

export class UserScrapRepositoryImpl extends EntityRepository<UserScrap> implements UserScrapRepository {
  async save(userScrap: UserScrap): Promise<void> {
    await this.em.persistAndFlush(userScrap);
  }
}
