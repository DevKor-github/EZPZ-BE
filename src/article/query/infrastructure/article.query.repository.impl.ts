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
      .execute<{ mediaPath: string }[]>();

    const imagePaths = mediaEntities.map((m) => m.mediaPath);

    if (!articleEntity) return null;

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
      tags: articleEntity.tags,
    };
  }

  async findAllByCriteria(): Promise<ArticleModel[]> {
    const articleEntities = await this.ormRepository
      .createQueryBuilder('a')
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
      .groupBy('a.id')
      .execute<ArticleModel[]>();

    const result = articleEntities.map((articleEntity) => ({
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      thumbnailPath: articleEntity.thumbnailPath,
      tags: articleEntity.tags,
    }));

    return result;
  }
}
