import { Identifier } from 'src/shared/core/domain/value-object/identifier';
import { Scrap } from '../domain/scrap';
import { ScrapEntity } from './scrap.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';

export class ScrapMapper {
  static toDomain(entity: ScrapEntity): Scrap {
    return Scrap.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      articleId: Identifier.from(entity.article.id),
      userId: Identifier.from(entity.user.id),
    });
  }

  static toEntity(domain: Scrap): ScrapEntity {
    const entity = new ScrapEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.article = { id: domain.articleId.value } as ArticleEntity;
    entity.user = { id: domain.userId.value } as UserEntity;

    return entity;
  }
}
