import { ArticleDetailModel } from '../article-detail.model';
import { ArticleModel } from '../article.model';

export interface ArticleQueryRepository {
  findById(id: string): Promise<ArticleDetailModel>;
  findAllByCriteria(
    tags?: string[],
    isFinished?: boolean,
    sortBy?: 'registrationStartAt' | 'scrapCount' | 'viewCount',
    page?: number,
    limit?: number,
  ): Promise<ArticleModel[]>;
}

export const ARTICLE_QUERY_REPOSITORY = Symbol('ARTICLE_QUERY_REPOSITORY');
