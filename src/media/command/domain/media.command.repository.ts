import { Media } from './media';

export interface MediaCommandRepository {
  save(media: Media): Promise<void>;
  saveAll(meidaList: Media[]): Promise<void>;
}

export const MEDIA_COMMAND_REPOSITORY = Symbol('MEDIA_COMMAND_REPOSITORY');
