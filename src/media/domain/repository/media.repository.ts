import { Media } from '../entity/media';

export interface MediaRepository {
  save(media: Media): Promise<void>;
}
