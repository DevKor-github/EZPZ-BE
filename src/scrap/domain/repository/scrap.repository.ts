import { Scrap } from '../entity/scrap';

export interface ScrapRepository {
  save(scrap: Scrap): Promise<void>;
  findByUserId(userId: string): Promise<Scrap[]>;
  findByArticleIdAndUserId(articleId: string, userId: string): Promise<Scrap | null>;
}

export const SCRAP_REPOSITORY = Symbol('SCRAP_REPOSITORY');
