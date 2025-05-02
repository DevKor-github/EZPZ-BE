import { Article } from '../entity/article';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
}
