import { ArticleSummaryModel } from '../../domain/article-summary.model';

export class GetArticleSummariesResult {
  articles: ArticleSummaryModel[];
  cursorId: string | null;
  cursorDate: string | null;
  hasNext: boolean;
}
