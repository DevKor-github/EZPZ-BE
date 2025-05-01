import { EntityRepository } from '@mikro-orm/mysql';
import { UserScrap } from 'src/user/domain/entity/user-scrap';
import { UserScrapRepository } from 'src/user/domain/repository/user-scrap.repository';
import { ScrapEntity } from '../orm-entity/scrap.entity';

export class UserScrapRepositoryImpl extends EntityRepository<UserScrap> implements UserScrapRepository {
  async save(userScrapEntity: ScrapEntity): Promise<void> {
    await this.em.persistAndFlush(userScrapEntity);
  }
}
