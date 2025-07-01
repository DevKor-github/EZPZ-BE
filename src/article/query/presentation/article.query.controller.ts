import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetArticleDetailUseCase } from '../application/detail/get-article-detail.usecase';
import { GetArticleListUseCase } from '../application/list/get-article-list.usecase';
import { ArticleDetailModel } from '../domain/article-detail.model';
import { ArticleModel } from '../domain/article.model';

@ApiTags('article')
@Controller('article')
export class ArticleQueryController {
  constructor(
    private readonly getArticleDetailUseCase: GetArticleDetailUseCase,
    private readonly getArticleListUseCase: GetArticleListUseCase,
  ) {}

  @Get(':id')
  async getArticleDetail(@Param('id') articleId: string): Promise<ArticleDetailModel> {
    return await this.getArticleDetailUseCase.execute({ articleId });
  }

  @Get()
  async getArticleList(): Promise<ArticleModel[]> {
    return await this.getArticleListUseCase.execute();
  }
}
