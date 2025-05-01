import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

export interface TagRepository {
  save(tagEntity: TagEntity): Promise<void>;
}
