import { Tag } from 'src/tag/domain/entity/tag';
import { TagEntity } from '../orm-entity/tag.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
// import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export const TagMapper = createMapper<Tag, TagEntity>(
  (entity: TagEntity): Tag => {
    console.log('TagMapper toDomain input:', {
      id: entity.id,
      name: entity.name,
    });
    const result = Tag.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      articleIds: entity.articles ? entity.articles.map((article) => Identifier.from(article.id)) : [],
    });
    console.log('TagMapper toDomain output:', {
      id: result.id.value,
      name: result.name,
    });
    return result;
  },
  (domain: Tag): TagEntity => {
    const entity = new TagEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.name = domain.name;

    // Relation Mapping
    // if (domain.articleIds) {
    //   entity.articles = domain.articleIds.map((id) => {
    //     const article = new ArticleEntity();
    //     article.id = id.value;
    //     return article;
    //   });
    // }
    return entity;
  },
);
