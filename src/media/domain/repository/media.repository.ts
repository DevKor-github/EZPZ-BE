import { Media } from '../entity/media';

export interface MediaRepository {
  save(media: Media): Promise<void>;

  findById(id: string): Promise<Media | null>;
}

export const MEDIA_REPOSITORY = Symbol('MEDIA_REPOSITORY');
