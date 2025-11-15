import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_READER, ArticleReader } from '../../domain/article.reader';
import { GetArticleListQuery } from './get-article-list.query';

@Injectable()
export class GetOrganizationArticleListUseCase {
  constructor(
    @Inject(ARTICLE_READER)
    private readonly articleReader: ArticleReader,
  ) {}

  async execute(query: GetArticleListQuery) {
    return this.articleReader.findAllByOrganizationId(query.organizationId);
  }
}
