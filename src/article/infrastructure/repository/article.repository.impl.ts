import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleEntity } from '../orm-entity/article.entity';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';
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

  async findById(id: string): Promise<ArticleDetailDto | null> {
    const articleEntity = await this.findOne({ id }, { populate: ['tags', 'media'], strategy: 'joined' });

    if (!articleEntity) {
      return null;
    }

    const article = {
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      description: articleEntity.description,
      location: articleEntity.location,
      startAt: articleEntity.startAt.toISOString(),
      endAt: articleEntity.endAt.toISOString(),
      thumbnailPath: articleEntity.media.find((m) => m.isThumbnail)?.mediaPath ?? '',
      imagePaths: articleEntity.media.map((m) => m.mediaPath),
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      registrationUrl: articleEntity.registrationUrl,
      tags: articleEntity.tags.map((tag) => tag.name),
    };

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
}
