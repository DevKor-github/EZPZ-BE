import { Article } from '../entity/article';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<Article[]>;
  findById(id: string): Promise<Article | null>;
  findByIds(articleIds: string[]): Promise<Article[]>;
  update(article: Article): Promise<void>;
  deleteById(id: string): Promise<void>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
