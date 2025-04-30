import { Media } from 'src/media/domain/entity/media';
import { MediaEntity } from '../orm-entity/media.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

export const MediaMapper = createMapper<Media, MediaEntity>(
  (entity: MediaEntity): Media => {
    return Media.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      mediaPath: entity.mediaPath,
      isThumbnail: entity.isThumbnail,
      articleId: entity.article?.id,
    });
  },
  (domain: Media): MediaEntity => {
    const entity = new MediaEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.mediaPath = domain.mediaPath;
    entity.isThumbnail = domain.isThumbnail;

    // Relation mapping
    if (domain.articleId) {
      const article = new ArticleEntity();
      article.id = domain.articleId;
      entity.article = article;
    }

    return entity;
  },
);
