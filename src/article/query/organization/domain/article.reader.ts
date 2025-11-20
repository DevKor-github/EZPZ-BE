import { ArticleModel } from './article.model';

export interface ArticleReader {
  findAllByOrganizationId(organizationId: string): Promise<ArticleModel[]>;
}

export const ARTICLE_READER = 'ARTICLE_READER';
