import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetArticleDetailUseCase } from '../application/article-detail/get-article-detail.use-case';
import { GetArticleListUseCase } from '../application/article-list/get-article-list.use-case';
import { ArticleDetailModel } from '../domain/article-detail.model';
import { ArticleModel } from '../domain/article.model';
import { ArticleQueryDocs } from './article.query.docs';
import { GetArticleListRequestDto } from '../application/article-list/dto/get-article-list.request.dto';

@ApiTags('article')
@Controller('article')
export class ArticleQueryController {
  constructor(
    private readonly getArticleDetailUseCase: GetArticleDetailUseCase,
    private readonly getArticleListUseCase: GetArticleListUseCase,
  ) {}

  @Get(':id')
  @ArticleQueryDocs('detail')
  async getArticleDetail(@Param('id') articleId: string): Promise<ArticleDetailModel> {
    return await this.getArticleDetailUseCase.execute({ articleId });
  }

  @Get()
  @ArticleQueryDocs('list')
  async getArticleList(@Query() reqDto: GetArticleListRequestDto): Promise<ArticleModel[]> {
    return await this.getArticleListUseCase.execute(reqDto);
  }
}
