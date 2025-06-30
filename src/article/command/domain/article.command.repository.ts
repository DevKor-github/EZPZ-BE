import { Article } from './article';

export interface ArticleCommandRepository {
  save(article: Article): Promise<void>;
  update(article: Article): Promise<void>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Article | null>;
}

export const ARTICLE_COMMAND_REPOSITORY = Symbol('ARTICLE_COMMAND_REPOSITORY');
