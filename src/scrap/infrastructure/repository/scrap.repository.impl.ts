import { EntityRepository } from '@mikro-orm/mysql';
import { Scrap } from 'src/scrap/domain/entity/scrap';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapMapper } from '../mapper/scrap.mapper';

export class ScrapRepositoryImpl extends EntityRepository<Scrap> implements ScrapRepository {
  async save(userScrap: Scrap): Promise<void> {
    const userScrapEntity = ScrapMapper.toEntity(userScrap);
    await this.em.persistAndFlush(userScrapEntity);
  }
}
