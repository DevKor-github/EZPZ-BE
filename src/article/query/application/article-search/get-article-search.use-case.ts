import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_QUERY_REPOSITORY, ArticleQueryRepository } from '../../domain/repository/article.query.repository';
import { ArticleModel } from '../../domain/article.model';
import { GetArticleSearchRequestDto } from './dto/get-article-search.request.dto';

@Injectable()
export class GetArticleSearchUseCase {
  constructor(
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(reqDto: GetArticleSearchRequestDto): Promise<ArticleModel[]> {
    const { keyword } = reqDto;
    return await this.articleQueryRepository.searchByKeyword(keyword);
  }
}
