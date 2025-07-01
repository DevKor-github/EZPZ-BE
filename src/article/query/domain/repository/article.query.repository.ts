import { ArticleDetailModel } from '../article-detail.model';
import { ArticleModel } from '../article.model';

export interface ArticleQueryRepository {
  findById(id: string): Promise<ArticleDetailModel | null>;
  findAllByCriteria(): Promise<ArticleModel[]>;
}

export const ARTICLE_QUERY_REPOSITORY = Symbol('ARTICLE_QUERY_REPOSITORY');
