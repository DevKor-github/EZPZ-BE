import { EntityRepository } from '@mikro-orm/mysql';
import { UserScrap } from 'src/user/domain/entity/user-scrap';
import { UserScrapRepository } from 'src/user/domain/repository/user-scrap.repository';
import { ScrapMapper } from '../mapper/scrap.mapper';

export class UserScrapRepositoryImpl extends EntityRepository<UserScrap> implements UserScrapRepository {
  async save(userScrap: UserScrap): Promise<void> {
    const userScrapEntity = ScrapMapper.toEntity(userScrap);
    await this.em.persistAndFlush(userScrapEntity);
  }
}
