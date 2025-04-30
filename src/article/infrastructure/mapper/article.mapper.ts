import { Article } from 'src/article/domain/entity/article';
import { ArticleEntity } from '../orm-entity/article.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';

export const ArticleMapper = createMapper<Article, ArticleEntity>(
  (entity: ArticleEntity): Article => {
    return Article.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      title: entity.title,
      organization: entity.organization,
      location: entity.location,
      description: entity.description,
      registrationUrl: entity.registrationUrl,
      startAt: entity.startAt,
      endAt: entity.endAt,
      scrapCount: entity.scrapCount,
      viewCount: entity.viewCount,
      mediaIds: entity.media ? entity.media.map((m) => m.id) : [],
      tagIds: entity.tags ? entity.tags.map((t) => t.id) : [],
    });
  },
  (domain: Article): ArticleEntity => {
    const entity = new ArticleEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.title = domain.title;
    entity.organization = domain.organization;
    entity.location = domain.location;
    entity.description = domain.description;
    entity.registrationUrl = domain.registrationUrl;
    entity.startAt = domain.startAt;
    entity.endAt = domain.endAt;
    entity.scrapCount = domain.scrapCount;
    entity.viewCount = domain.viewCount;

    return entity;
  },
);
