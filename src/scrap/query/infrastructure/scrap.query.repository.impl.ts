import { EntityRepository, sql } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ScrapEntity } from 'src/scrap/command/infrastructure/scrap.entity';
import { ScrapQueryRepository } from '../domain/scrap.query.repository';
import { ScrapModel } from '../domain/scrap.model';

export class ScrapQueryRepositoryImpl implements ScrapQueryRepository {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapOrmRepository: EntityRepository<ScrapEntity>,
  ) {}

  async findByUserId(userId: string): Promise<ScrapModel[]> {
    const scrapEntities = await this.scrapOrmRepository
      .createQueryBuilder('s')
      .select([
        'a.id as articleId',
        'a.title as title',
        'a.organization as organization',
        'a.scrap_count as scrapCount',
        'a.view_count as viewCount',
        //'a.thumbnailPath as thumbnailPath',
        sql`group_concat(distinct t.name) as tags`,
      ])
      .where({ user: { id: userId } })
      .leftJoin('s.article', 'a')
      .leftJoin('a.tags', 't')
      .groupBy('a.id')
      .execute<ScrapModel[]>();

    const result = scrapEntities.map((entity) => ({
      articleId: entity.articleId,
      title: entity.title,
      organization: entity.organization,
      scrapCount: entity.scrapCount,
      viewCount: entity.viewCount,
      thumbnailPath: '',
      tags: entity.tags ? (entity.tags as unknown as string).split(',') : [],
    }));

    return result;
  }

  async existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean> {
    const exists = await this.scrapOrmRepository.count({ article: { id: articleId }, user: { id: userId } });

    return exists > 0;
  }
}
