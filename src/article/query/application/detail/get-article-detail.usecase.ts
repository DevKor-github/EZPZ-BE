import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetArticleDetailProjection } from './get-article-detail.projection';
import { GetArticleDetailRequestDto } from './dto/get-article-detail.request.dto';
import { ARTICLE_QUERY_REPOSITORY, ArticleQueryRepository } from '../../domain/repository/article.query.repository';

@Injectable()
export class GetArticleDetailUseCase {
  constructor(
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(reqDto: GetArticleDetailRequestDto): Promise<GetArticleDetailProjection> {
    const { articleId } = reqDto;
    const result = await this.articleQueryRepository.findById(articleId);
    if (!result) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');

    return result;
  }
}
