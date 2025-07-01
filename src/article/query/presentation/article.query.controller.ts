import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetArticleDetailUseCase } from '../application/article-detail/get-article-detail.use-case';
import { GetArticleListUseCase } from '../application/article-list/get-article-list.use-case';
import { ArticleDetailModel } from '../domain/article-detail.model';
import { ArticleModel } from '../domain/article.model';
import { ArticleQueryDocs } from './article.query.docs';

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
  async getArticleList(): Promise<ArticleModel[]> {
    return await this.getArticleListUseCase.execute();
  }
}
