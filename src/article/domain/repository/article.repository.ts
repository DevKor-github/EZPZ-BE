import { Article } from '../entity/article';
import { ArticleListItem } from '../../application/dto/article.list.item';
import { ArticleDetailDto } from '../../application/dto/article.detail.dto';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<ArticleListItem[]>;
  findById(id: string): Promise<ArticleDetailDto | null>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
