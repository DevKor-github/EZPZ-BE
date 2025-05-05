import { Article } from '../entity/article';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
