import { UserScrap } from 'src/user/domain/entity/user-scrap';
import { ScrapEntity } from '../orm-entity/scrap.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { UserEntity } from '../orm-entity/user.entity';

export const ScrapMapper = createMapper<UserScrap, ScrapEntity>(
  (entity: ScrapEntity): UserScrap => {
    return UserScrap.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      articleId: entity.article.id,
      userId: entity.user.id,
    });
  },
  (domain: UserScrap): ScrapEntity => {
    const entity = new ScrapEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    // Relation mapping
    const article = new ArticleEntity();
    article.id = domain.articleId;
    entity.article = article;

    const user = new UserEntity();
    user.id = domain.userId;
    entity.user = user;

    return entity;
  },
);
