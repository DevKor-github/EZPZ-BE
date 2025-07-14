import { ScrapModel } from './scrap.model';

export interface ScrapQueryRepository {
  findByCriteria(
    userId: string,
    tags?: string[],
    isFinished?: boolean,
    sortBy?: 'createdAt' | 'scrapCount' | 'viewCount',
  ): Promise<ScrapModel[]>;
  existsByArticleIdAndUserId(articleId: string, userId: string): Promise<boolean>;
}

export const SCRAP_QUERY_REPOSITORY = Symbol('SCRAP_QUERY_REPOSITORY');
