import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_READER, ArticleReader } from '../../domain/article.reader';
import { GetArticleSummariesQuery } from './get-article-summaries.query';
import { GetArticleSummariesResult } from './get-article-summaries.result';

@Injectable()
export class GetArticleSummariesUseCase {
  constructor(
    @Inject(ARTICLE_READER)
    private readonly articleReader: ArticleReader,
  ) {}

  async execute(query: GetArticleSummariesQuery): Promise<GetArticleSummariesResult> {
    const { pageSize, cursorId, cursorDate } = query;
    const articleSummaries = await this.articleReader.findAllByCursor(pageSize, cursorId, cursorDate);
    // 다음 페이지 여부 확인
    const hasNext = articleSummaries.length > pageSize;

    // 실제 반환할 데이터 (마지막 +1개는 제거)
    const articles = hasNext ? articleSummaries.slice(0, pageSize) : articleSummaries;

    // 다음 커서 정보 추출
    const lastItem = articles[articles.length - 1];
    const nextCursorId = hasNext && lastItem ? lastItem.id : null;
    const nextCursorDate = hasNext && lastItem ? lastItem.createdAt : null;

    return {
      articles,
      cursorId: nextCursorId,
      cursorDate: nextCursorDate,
      hasNext,
    };
  }
}
