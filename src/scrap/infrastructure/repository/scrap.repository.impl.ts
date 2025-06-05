import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { Scrap } from 'src/scrap/domain/entity/scrap';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapMapper } from '../mapper/scrap.mapper';
import { ScrapEntity } from '../orm-entity/scrap.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

export class ScrapRepositoryImpl implements ScrapRepository {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapOrmRepository: EntityRepository<ScrapEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(userScrap: Scrap): Promise<void> {
    const userScrapEntity = ScrapMapper.toEntity(userScrap);
    await this.em.persistAndFlush(userScrapEntity);
  }

  async findByUserId(userId: string): Promise<Scrap[]> {
    const scrapEntities = await this.scrapOrmRepository.find(
      { user: { id: userId } },
      { orderBy: { updatedAt: 'DESC' } },
    );

    return scrapEntities.map((entity) => ScrapMapper.toDomain(entity));
  }

  async findByArticleIdAndUserId(articleId: string, userId: string): Promise<Scrap | null> {
    const scrapEntity = await this.scrapOrmRepository.findOne({ article: { id: articleId }, user: { id: userId } });
    if (!scrapEntity) return null;

    return ScrapMapper.toDomain(scrapEntity);
  }

  async existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean> {
    const exists = await this.scrapOrmRepository.count({ article: { id: articleId }, user: { id: userId } });

    return exists > 0;
  }

  async deleteByArticleIdAndUserId(articleId: string, userId: string): Promise<void> {
    const scrapEntity = await this.scrapOrmRepository.findOne({ article: { id: articleId }, user: { id: userId } });
    if (!scrapEntity) throw new NotFoundException('스크랩이 존재하지 않습니다.');

    await this.em.removeAndFlush(scrapEntity);
  }
}
