import { Tag } from 'src/tag/domain/entity/tag';
import { Article } from '../entity/article';

export interface ArticleRepository {
  save(article: Article): Promise<void>;
  findByTags(tags: Tag[]): Promise<Article[] | undefined>;
}

export const ARTICLE_REPOSITORY = Symbol('ARTICLE_REPOSITORY');
