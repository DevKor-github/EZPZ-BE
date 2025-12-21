import { EntityRepository, sql } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ScrapQueryRepository } from '../domain/scrap.query.repository';
import { ScrapModel } from '../domain/scrap.model';
import { ScrapViewEntity } from './scrap.view.entity';

export class ScrapQueryRepositoryImpl implements ScrapQueryRepository {
  constructor(
    @InjectRepository(ScrapViewEntity)
    private readonly scrapOrmRepository: EntityRepository<ScrapViewEntity>,
  ) {}

  async findByCriteria(
    userId: string,
    tags?: string[],
    isFinished?: boolean,
    sortBy?: 'createdAt' | 'scrapCount' | 'viewCount',
  ): Promise<ScrapModel[]> {
    const qb = this.scrapOrmRepository.createQueryBuilder('s');

    qb.where({ userId });

    if (!isFinished) qb.andWhere({ endAt: { $gte: new Date() } });

    if (tags && tags.length > 0) {
      const placeholders = tags.map(() => '?').join(',');
      qb.andWhere(
        `
          s.article_id IN (
            SELECT DISTINCT at.article_entity_id
            FROM article_tags at
            INNER JOIN tag t ON t.id = at.tag_entity_id
            WHERE t.name IN (${placeholders})
          )
        `,
        tags,
      );
    }

    qb.orderBy({ [sortBy ? `a.${sortBy}` : 'createdAt']: 'DESC' });

    const scrapEntities = await qb.execute<ScrapModel[]>();

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
      registrationStartAt: entity.registrationStartAt,
      registrationEndAt: entity.registrationEndAt,
    }));

    return result;
  }

  async searchByKeyword(userId: string, keyword: string): Promise<ScrapModel[]> {
    const qb = this.scrapOrmRepository.createQueryBuilder('s');

    qb.where({ userId });

    // 검색어 조건: 제목에서 검색
    qb.andWhere(`s.title LIKE ?`, [`%${keyword}%`]);

    // 정렬: 현재 시간에 가장 가까운 순서 (미래 우선)
    qb.orderBy([
      {
        [sql`CASE WHEN COALESCE(s.registration_start_at, s.start_at) >= NOW() THEN 0 ELSE 1 END` as unknown as string]:
          'asc',
      },
      {
        [sql`ABS(TIMESTAMPDIFF(SECOND, COALESCE(s.registration_start_at, s.start_at), NOW()))` as unknown as string]:
          'asc',
      },
    ]);

    const scrapEntities = await qb.execute<ScrapModel[]>();

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
      registrationStartAt: entity.registrationStartAt,
      registrationEndAt: entity.registrationEndAt,
    }));

    return result;
  }

  async existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean> {
    const exists = await this.scrapOrmRepository.count({ articleId, userId });

    return exists > 0;
  }
}
