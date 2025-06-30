import { ScrapModel } from './scrap.model';

export interface ScrapQueryRepository {
  findByUserId(userId: string): Promise<ScrapModel[]>;
  existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean>;
}

export const SCRAP_QUERY_REPOSITORY = Symbol('SCRAP_QUERY_REPOSITORY');
