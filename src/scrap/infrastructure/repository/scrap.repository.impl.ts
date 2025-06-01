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

  async findByArticleIdAndUserId(articleId: string, userId: string): Promise<Scrap | null> {
    const scrapEntity = await this.findOne({ article: { id: articleId }, user: { id: userId } });
    if (!scrapEntity) return null;

    return ScrapMapper.toDomain(scrapEntity);
  }

  async existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean> {
    const exists = await this.count({ article: { id: articleId }, user: { id: userId } });

    return exists > 0;
  }
}
