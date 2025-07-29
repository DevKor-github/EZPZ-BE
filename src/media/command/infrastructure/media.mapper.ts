import { Identifier } from 'src/shared/core/domain/identifier';
import { Media } from '../domain/media';
import { MediaEntity } from './media.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';

export class MediaMapper {
  static toDomain(entity: MediaEntity): Media {
    return Media.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      mediaPath: entity.mediaPath,
      order: entity.order,
      articleId: Identifier.from(entity.article?.id),
    });
  }

  static toEntity(domain: Media, em: EntityManager): MediaEntity {
    const entity = new MediaEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.mediaPath = domain.mediaPath;
    entity.order = domain.order;
    entity.article = em.getReference(ArticleEntity, domain.articleId!.value);

    return entity;
  }
}
