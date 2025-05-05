import { Media } from '../entity/media';

export interface MediaRepository {
  save(media: Media): Promise<void>;
}

export const MEDIA_REPOSITORY = Symbol('MEDIA_REPOSITORY');
