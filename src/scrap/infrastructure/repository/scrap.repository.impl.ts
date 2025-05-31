import { EntityRepository } from '@mikro-orm/mysql';
import { Scrap } from 'src/scrap/domain/entity/scrap';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapMapper } from '../mapper/scrap.mapper';
import { ScrapEntity } from '../orm-entity/scrap.entity';

export class ScrapRepositoryImpl extends EntityRepository<ScrapEntity> implements ScrapRepository {
  async save(userScrap: Scrap): Promise<void> {
    const userScrapEntity = ScrapMapper.toEntity(userScrap);
    await this.em.persistAndFlush(userScrapEntity);
  }

  async findByUserId(userId: string): Promise<Scrap[]> {
    const scrapEntities = await this.find({ user: { id: userId } }, { orderBy: { updatedAt: 'DESC' } });

    return scrapEntities.map((entity) => ScrapMapper.toDomain(entity));
  }
}
