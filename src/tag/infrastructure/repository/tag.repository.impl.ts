import { EntityRepository } from '@mikro-orm/mysql';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';

export class TagRepositoryImpl extends EntityRepository<Tag> implements TagRepository {
  async save(tag: Tag): Promise<void> {
    await this.em.persistAndFlush(tag);
  }
}
