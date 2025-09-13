import { Inject, Injectable } from '@nestjs/common';
import { GetArticleDetailRequestDto } from './dto/get-article-detail.request.dto';
import { ARTICLE_QUERY_REPOSITORY, ArticleQueryRepository } from '../../domain/repository/article.query.repository';
import { ArticleDetailModel } from '../../domain/article-detail.model';

@Injectable()
export class GetArticleDetailUseCase {
  constructor(
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(reqDto: GetArticleDetailRequestDto): Promise<ArticleDetailModel> {
    const { articleId } = reqDto;
    const result = await this.articleQueryRepository.findById(articleId);

    return result;
  }
}
