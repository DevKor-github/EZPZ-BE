import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_QUERY_REPOSITORY, ArticleQueryRepository } from '../../domain/repository/article.query.repository';
import { ArticleModel } from '../../domain/article.model';

@Injectable()
export class GetArticleListUseCase {
  constructor(
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(): Promise<ArticleModel[]> {
    return await this.articleQueryRepository.findAllByCriteria();
  }
}
