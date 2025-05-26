import { Article } from 'src/article/domain/entity/article';
import { ArticleEntity } from '../orm-entity/article.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { TagMapper } from 'src/tag/infrastructure/mapper/tag.mapper';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { Collection } from '@mikro-orm/core';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

export const ArticleMapper = createMapper<Article, ArticleEntity>(
  (entity: ArticleEntity): Article => {
    return Article.create({
      id: Identifier.from(entity.id),
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
      mediaIds: entity.media ? entity.media.map((m) => Identifier.from(m.id)) : [],
      tags: entity.tags ? entity.tags.map((tag) => TagMapper.toDomain(tag)) : [],
    });
  },
  (domain: Article): ArticleEntity => {
    const entity = new ArticleEntity();
    entity.id = domain.id.value;
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
    entity.tags = new Collection<TagEntity>(entity);
    return entity;
  },
);
