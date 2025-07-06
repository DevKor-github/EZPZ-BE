import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleQueryRepository } from '../domain/repository/article.query.repository';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { EntityManager, EntityRepository, sql } from '@mikro-orm/mysql';
import { ArticleDetailModel } from '../domain/article-detail.model';
import { ArticleModel } from '../domain/article.model';

export class ArticleQueryRepositoryImpl implements ArticleQueryRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ormRepository: EntityRepository<ArticleEntity>,
    private readonly em: EntityManager,
  ) {}

  async findById(id: string): Promise<ArticleDetailModel | null> {
    // 먼저 게시물 존재 여부 확인
    const existsCheck = await this.ormRepository.createQueryBuilder('a').select(['a.id']).where({ id: id }).execute();

    if (!existsCheck.length) return null;

    // 조회수 증가
    await this.em.execute('UPDATE article SET view_count = view_count + 1 WHERE id = ?', [id]);

    // 증가된 조회수가 반영된 게시물 정보 조회
    const articleEntity = (
      await this.ormRepository
        .createQueryBuilder('a')
        .select([
          'a.id',
          'a.title',
          'a.organization',
          'a.description',
          'a.location',
          'a.startAt',
          'a.endAt',
          'a.scrapCount',
          'a.viewCount',
          'a.registrationUrl',
          sql`(
            SELECT m.media_path
            FROM media m
            WHERE m.article_id = a.id AND m.order = 0
            LIMIT 1
          ) AS thumbnailPath`,
          sql`group_concat(distinct tag.name) as tags`,
        ])
        .leftJoin('a.tags', 'tag')
        .where({ id: id })
        .execute<ArticleDetailModel[]>()
    )[0];

    const mediaEntities = await this.ormRepository
      .createQueryBuilder('a')
      .select(['m.media_path as mediaPath'])
      .leftJoin('a.media', 'm')
      .where({ id: id })
      .orderBy({ 'm.order': 'ASC' })
      .execute<{ mediaPath: string }[]>();

    const imagePaths = mediaEntities.map((m) => m.mediaPath);

    return {
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      description: articleEntity.description,
      location: articleEntity.location,
      startAt: articleEntity.startAt,
      endAt: articleEntity.endAt,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      registrationUrl: articleEntity.registrationUrl,
      thumbnailPath: articleEntity.thumbnailPath,
      imagePaths: imagePaths,
      tags: articleEntity.tags ? (articleEntity.tags as unknown as string).split(',') : [],
    };
  }

  async findAllByCriteria(
    tags?: string[],
    isFinished?: boolean,
    sortBy?: 'createdAt' | 'scrapCount' | 'viewCount',
    // page?: number,
    // limit?: number,
  ): Promise<ArticleModel[]> {
    const query = this.ormRepository.createQueryBuilder('a');
    query
      .select([
        'a.id',
        'a.title',
        'a.organization',
        'a.scrapCount',
        'a.viewCount',
        sql`(
            SELECT m.media_path
            FROM media m
            WHERE m.article_id = a.id AND m.order = 0
            LIMIT 1
          ) AS thumbnailPath`,
        sql`group_concat(distinct tag.name) as tags`,
      ])
      .leftJoin('a.tags', 'tag')
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
      query.andWhere({ endAt: { $gte: now } }); // 종료되지 않은 것만
    }
    // isFinished가 true이거나 undefined면 모든 것을 조회 (필터링 없음)

    // 정렬
    if (sortBy) {
      query.orderBy({ [`a.${sortBy}`]: 'DESC' });
    } else {
      query.orderBy({ 'a.createdAt': 'DESC' }); // 기본 정렬은 생성일 기준
    }

    // query.limit(limit).offset((page - 1) * limit);

    const articleEntities = await query.execute<ArticleModel[]>();

    const result = articleEntities.map((articleEntity) => ({
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      thumbnailPath: articleEntity.thumbnailPath,
      tags: articleEntity.tags ? (articleEntity.tags as unknown as string).split(',') : [],
    }));

    return result;
  }
}
