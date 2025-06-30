import { GetArticleDetailProjection } from '../../application/detail/get-article-detail.projection';
import { GetArticleListProjection } from '../../application/list/get-article-list.projection';

export interface ArticleQueryRepository {
  findById(id: string): Promise<GetArticleDetailProjection | null>;
  findAllByCriteria(): Promise<GetArticleListProjection[]>;
}

export const ARTICLE_QUERY_REPOSITORY = Symbol('ARTICLE_QUERY_REPOSITORY');
