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

  async findByCriteria(
    userId: string,
    tags?: string[],
    isFinished?: boolean,
    sortBy?: 'createdAt' | 'scrapCount' | 'viewCount',
  ): Promise<ScrapModel[]> {
    const query = this.scrapOrmRepository
      .createQueryBuilder('s')
      .select([
        'a.id as articleId',
        'a.title as title',
        'a.organization as organization',
        'a.scrap_count as scrapCount',
        'a.view_count as viewCount',
        'a.start_at as startAt',
        'a.end_at as endAt',
        sql`(
            SELECT m.media_path
            FROM media m
            WHERE m.article_id = s.article_id AND m.order = 0
            LIMIT 1
          ) AS thumbnailPath`,
        sql`group_concat(distinct t.name) as tags`,
      ])
      .leftJoin('s.article', 'a')
      .leftJoin('a.tags', 't')
      .where({ user: userId })
      .groupBy('a.id');

    if (tags && tags.length > 0) {
      const placeholders = tags.map(() => '?').join(',');
      query.andWhere(
        `a.id IN (
          SELECT DISTINCT a2.id 
          FROM article a2 
          INNER JOIN article_tags at2 ON a2.id = at2.article_entity_id 
          INNER JOIN tag t2 ON at2.tag_entity_id = t2.id 
          WHERE t2.name IN (${placeholders})
        )`,
        tags,
      );
    }

    // 조건: isFinished가 false일 때만 진행 중인 것들만 필터링
    if (isFinished === false) {
      const now = new Date();
      query.andWhere({ endAt: { $gte: now } });
    }

    // 정렬
    if (sortBy) {
      query.orderBy({ [`a.${sortBy}`]: 'DESC' });
    } else {
      query.orderBy({ 'a.createdAt': 'DESC' }); // 기본 정렬은 생성일 기준
    }

    const scrapEntities = await query.execute<ScrapModel[]>();

    const result = scrapEntities.map((entity) => ({
      articleId: entity.articleId,
      title: entity.title,
      organization: entity.organization,
      scrapCount: entity.scrapCount,
      viewCount: entity.viewCount,
      thumbnailPath: entity.thumbnailPath,
      tags: entity.tags ? (entity.tags as unknown as string).split(',') : [],
      startAt: entity.startAt,
      endAt: entity.endAt,
    }));

    return result;
  }

  async existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean> {
    const exists = await this.scrapOrmRepository.count({ article: { id: articleId }, user: { id: userId } });

    return exists > 0;
  }
}
