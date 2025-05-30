import { Scrap } from 'src/scrap/domain/entity/scrap';
import { ScrapEntity } from '../entity/scrap.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { UserEntity } from '../../../user/infrastructure/orm-entity/user.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export const ScrapMapper = createMapper<Scrap, ScrapEntity>(
  (entity: ScrapEntity): Scrap => {
    return Scrap.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      articleId: Identifier.from(entity.article.id),
      userId: Identifier.from(entity.user.id),
    });
  },
  (domain: Scrap): ScrapEntity => {
    const entity = new ScrapEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.article = { id: domain.articleId.value } as ArticleEntity;
    entity.user = { id: domain.userId.value } as UserEntity;

    return entity;
  },
);
