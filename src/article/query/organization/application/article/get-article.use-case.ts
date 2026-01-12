import { Inject, Injectable } from '@nestjs/common';
import { GetArticleAdminQuery } from './get-article.query';
import { ARTICLE_READER, ArticleReader } from '../../domain/article.reader';
import { ArticleModel } from '../../domain/article.model';

@Injectable()
export class GetArticleAdminUseCase {
  constructor(
    @Inject(ARTICLE_READER)
    private readonly articleReader: ArticleReader,
  ) {}

  async execute(query: GetArticleAdminQuery): Promise<ArticleModel> {
    const { articleId } = query;

    return await this.articleReader.findById(articleId);
  }
}
