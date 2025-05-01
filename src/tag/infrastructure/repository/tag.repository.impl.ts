import { EntityRepository } from '@mikro-orm/mysql';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagEntity } from '../orm-entity/tag.entity';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';

export class TagRepositoryImpl extends EntityRepository<Tag> implements TagRepository {
  async save(tagEntity: TagEntity): Promise<void> {
    await this.em.persistAndFlush(tagEntity);
  }
}
