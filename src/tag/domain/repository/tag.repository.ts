import { Tag } from '../entity/tag';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findByName(name: string): Promise<Tag | null>;
}

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');
