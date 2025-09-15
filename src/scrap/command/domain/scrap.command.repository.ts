import { Scrap } from './scrap';

export interface ScrapCommandRepository {
  save(scrap: Scrap): Promise<void>;
  deleteByArticleIdAndUserId(articleId: string, userId: string): Promise<void>;
  findByArticleIdAndUserId(articleId: string, userId: string): Promise<Scrap>;
}

export const SCRAP_COMMAND_REPOSITORY = Symbol('SCRAP_COMMAND_REPOSITORY');
