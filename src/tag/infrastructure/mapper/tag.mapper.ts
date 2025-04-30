import { Tag } from 'src/tag/domain/entity/tag';
import { TagEntity } from '../orm-entity/tag.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

export const TagMapper = createMapper<Tag, TagEntity>(
  (entity: TagEntity): Tag => {
    return Tag.create({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      articleIds: entity.articles ? entity.articles.map((article) => article.id) : [],
    });
  },
  (domain: Tag): TagEntity => {
    const entity = new TagEntity();
    entity.id = domain.id;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.name = domain.name;

    // Relation Mapping
    if (domain.articleIds) {
      entity.articles = domain.articleIds.map((id) => {
        const article = new ArticleEntity();
        article.id = id;
        return article;
      });
    }
    return entity;
  },
);
