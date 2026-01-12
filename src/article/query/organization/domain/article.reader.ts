import { ArticleSummaryModel } from './article-summary.model';
import { ArticleModel } from './article.model';

export interface ArticleReader {
  findById(articleId: string): Promise<ArticleModel>;
  findAllByOrganizationId(organizationId: string): Promise<ArticleModel[]>;
  findAllByCursor(pageSize: number, cursorId?: string, cursorDate?: Date): Promise<ArticleSummaryModel[]>;
}

export const ARTICLE_READER = 'ARTICLE_READER';
