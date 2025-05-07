import { Article } from '../entity/article';
import { ArticleListItem } from '../entity/article.list.item';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<ArticleListItem[]>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
