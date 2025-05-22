import { Tag } from 'src/tag/domain/entity/tag';
import { TagEntity } from '../orm-entity/tag.entity';
import { createMapper } from 'src/shared/infrastructure/mapper/base.mapper';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export const TagMapper = createMapper<Tag, TagEntity>(
  (entity: TagEntity): Tag => {
    const result = Tag.create({
      id: Identifier.from(entity.id),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name,
      articleIds: [],
    });
    return result;
  },
  (domain: Tag): TagEntity => {
    const entity = new TagEntity();
    entity.id = domain.id.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    entity.name = domain.name;
    return entity;
  },
);
