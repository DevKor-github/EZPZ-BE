import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleUseCase } from '../application/create-article/create-article.use-case';
import { CreateArticleRequestDto } from '../application/create-article/dto/create-article.request.dto';
import { CreateArticleResponseDto } from '../application/create-article/dto/create-article.response.dto';
import { DeleteArticleUseCase } from '../application/delete-article/delete-article.use-case';
import { UpdateArticleUseCase } from '../application/update-article/update-article.use-case';
import { UpdateArticleRequestDto } from '../application/update-article/dto/update-article.request.dto';
import { ArticleCommandDocs } from './article.command.docs';

@ApiTags('article')
@Controller('article')
export class ArticleCommandController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  @Post()
  @ArticleCommandDocs('create')
  async createArticle(@Body() reqDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    return await this.createArticleUseCase.execute(reqDto);
  }

  @Patch(':id')
  @ArticleCommandDocs('update')
  async updateArticle(@Param('id') id: string, @Body() reqDto: UpdateArticleRequestDto): Promise<void> {
    return await this.updateArticleUseCase.execute(id, reqDto);
  }

  @Delete(':id')
  @ArticleCommandDocs('delete')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute(id);
  }
}
