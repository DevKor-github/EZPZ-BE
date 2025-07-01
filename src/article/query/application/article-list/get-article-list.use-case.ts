import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_QUERY_REPOSITORY, ArticleQueryRepository } from '../../domain/repository/article.query.repository';
import { ArticleModel } from '../../domain/article.model';
import { GetArticleListRequestDto } from './dto/get-article-list.request.dto';

@Injectable()
export class GetArticleListUseCase {
  constructor(
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(reqDto: GetArticleListRequestDto): Promise<ArticleModel[]> {
    const { tags, isFinished, sortBy, page, limit } = reqDto;
    return await this.articleQueryRepository.findAllByCriteria(tags, isFinished, sortBy, page, limit);
  }
}
