import { EntityRepository } from '@mikro-orm/mysql';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';
import { TagMapper } from '../mapper/tag.mapper';
import { TagEntity } from '../orm-entity/tag.entity';

export class TagRepositoryImpl extends EntityRepository<TagEntity> implements TagRepository {
  async save(tag: Tag): Promise<void> {
    const tagEntity = TagMapper.toEntity(tag);
    await this.em.persistAndFlush(tagEntity);
  }

  async findByName(name: string): Promise<Tag | null> {
    const tagEntity = await this.findOne({ name }, { populate: ['articles'] });
    console.log('TagRepository findByName result:', {
      searchName: name,
      found: !!tagEntity,
      entityData: tagEntity
        ? {
            id: tagEntity.id,
            name: tagEntity.name,
          }
        : null,
    });
    return tagEntity ? TagMapper.toDomain(tagEntity) : null;
  }
}
