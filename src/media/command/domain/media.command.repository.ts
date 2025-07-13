import { Media } from './media';

export interface MediaCommandRepository {
  save(media: Media): Promise<void>;
  saveAll(meidaList: Media[]): Promise<void>;
  deleteByIds(mediaIds: string[]): Promise<void>;
  findByArticleId(articleId: string): Promise<Media[]>;
  updateAll(mediaList: Media[]): Promise<void>;
}

export const MEDIA_COMMAND_REPOSITORY = Symbol('MEDIA_COMMAND_REPOSITORY');
