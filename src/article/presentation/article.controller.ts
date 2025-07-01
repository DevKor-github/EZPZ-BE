import { Controller, Get, Query, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetArticleListUseCase } from '../application/get-article-list/get-article-list.use-case';
import { GetArticleListRequestDto } from '../application/get-article-list/dto/get-article-list.request.dto';
import { GetArticleListResponseDto } from '../application/get-article-list/dto/get-article-list.response.dto';
import { GetArticleDetailUseCase } from '../application/get-article-detail/get-article-detail.use-case';
import { GetArticleDetailRequestDto } from '../application/get-article-detail/dto/get-article-detail.request.dto';
import { GetArticleDetailResponseDto } from '../application/get-article-detail/dto/get-article-detail.response.dto';
import { CreateArticleUseCase } from '../application/create-article/create-article.use-case';
import { CreateArticleRequestDto } from '../application/create-article/dto/create-article.request.dto';
import { CreateArticleResponseDto } from '../application/create-article/dto/create-article.response.dto';
import { DeleteArticleUseCase } from '../application/delete-article/delete-article.use-case';
import { DeleteArticleRequestDto } from '../application/delete-article/dto/delete-article.request.dto';
import { ArticleDocs } from './article.docs';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly getArticleListUseCase: GetArticleListUseCase,
    private readonly getArticleDetailUseCase: GetArticleDetailUseCase,
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  @Get()
  @ArticleDocs('list')
  async list(@Query() filter: GetArticleListRequestDto): Promise<GetArticleListResponseDto> {
    return this.getArticleListUseCase.execute(filter);
  }

  @Get(':id')
  @ArticleDocs('detail')
  async detail(@Param('id') id: string): Promise<GetArticleDetailResponseDto> {
    const requestDto: GetArticleDetailRequestDto = { id };
    return this.getArticleDetailUseCase.execute(requestDto);
  }

  @Post()
  @ArticleDocs('create')
  async create(@Body() createDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    return this.createArticleUseCase.execute(createDto);
  }

  @Delete(':id')
  @ArticleDocs('delete')
  async delete(@Param('id') id: string): Promise<void> {
    const requestDto: DeleteArticleRequestDto = { id };
    return this.deleteArticleUseCase.execute(requestDto);
  }
}
