import { Tag } from '../entity/tag';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
}
