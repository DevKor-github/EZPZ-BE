import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleEntity } from '../orm-entity/article.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

export class ArticleRepositoryImpl extends EntityRepository<ArticleEntity> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);

    // Get references to existing tags
    const tagRefs = await Promise.all(
      article.tags.map((tag) => {
        return this.em.getReference(TagEntity, tag.id.value);
      }),
    );
    articleEntity.tags.set(tagRefs);

    await this.em.persistAndFlush(articleEntity);
  }

  async findById(id: string): Promise<Article | null> {
    const articleEntity = await this.findOne({ id }, { populate: ['tags', 'media'], strategy: 'joined' });

    if (!articleEntity) {
      return null;
    }

    const article = ArticleMapper.toDomain(articleEntity);
    return article;
  }

  async findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<Article[]> {
    if (!this.em) {
      throw new Error('em is not initialized');
    }

    const now = new Date();

    const where: Record<string, any> = {};

    if (params.tags?.length) {
      where.tags = { name: { $in: params.tags } };
    }

    if (params.isFinished === false) {
      where.endAt = { $gt: now };
    }

    const orderBy: Record<string, 'ASC' | 'DESC'> = {};
    switch (params.sort) {
      case 'scrapCount':
        orderBy.scrapCount = 'DESC';
        break;
      case 'viewCount':
        orderBy.viewCount = 'DESC';
        break;
      default:
        orderBy.createdAt = 'DESC';
    }

    const entities = await this.findAll({
      where,
      orderBy,
      populate: ['tags', 'media'],
    });

    return entities.map((entity) => ArticleMapper.toDomain(entity));
  }

  async findByIds(articleIds: string[]): Promise<Article[]> {
    const articleEntities = await this.find({ id: { $in: articleIds } }, { populate: ['tags', 'media'] });

    return articleEntities.map((entity) => ArticleMapper.toDomain(entity));
  }

  async update(article: Article): Promise<void> {
    await this.em.nativeUpdate(
      ArticleEntity,
      { id: article.id.value },
      {
        title: article.title,
        organization: article.organization,
        location: article.location,
        description: article.description,
        registrationUrl: article.registrationUrl,
        startAt: article.startAt,
        endAt: article.endAt,
        scrapCount: article.scrapCount,
        viewCount: article.viewCount,
      },
    );
  }

  async deleteById(id: string): Promise<void> {
    // cascade 설정을 활용하여 entity를 먼저 조회
    const articleEntity = await this.findOne({ id }, { populate: ['media'] });

    if (articleEntity) {
      // entity를 삭제하면 cascade로 인해 media도 자동 삭제됨
      await this.em.removeAndFlush(articleEntity);
    }
  }
}
