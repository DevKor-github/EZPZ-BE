import { Article } from '../entity/article';
import { ArticleDetailDto } from '../../application/dto/article.detail.dto';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<Article[]>;
  findById(id: string): Promise<ArticleDetailDto | null>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
