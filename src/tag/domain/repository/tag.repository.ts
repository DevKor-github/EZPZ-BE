import { Tag } from '../entity/tag';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
}

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');
