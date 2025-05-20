import { Media } from 'src/media/domain/entity/media';
import { MediaEntity } from '../orm-entity/media.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { EntityManager } from '@mikro-orm/mysql';

export class MediaMapper {
  static toDomain(entity: MediaEntity): Media {
    return Media.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      mediaPath: entity.mediaPath,
      isThumbnail: entity.isThumbnail,
      articleId: Identifier.from(entity.article?.id),
    });
  }

  static toEntity(domain: Media, em: EntityManager): MediaEntity {
    const entity = new MediaEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.mediaPath = domain.mediaPath;
    entity.isThumbnail = domain.isThumbnail;
    entity.article = em.getReference(ArticleEntity, domain.articleId!.value);

    return entity;
  }
}
