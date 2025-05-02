import { EntityRepository } from '@mikro-orm/mysql';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';
import { TagMapper } from '../mapper/tag.mapper';

export class TagRepositoryImpl extends EntityRepository<Tag> implements TagRepository {
  async save(tag: Tag): Promise<void> {
    const tagEntity = TagMapper.toEntity(tag);
    await this.em.persistAndFlush(tagEntity);
  }
}
