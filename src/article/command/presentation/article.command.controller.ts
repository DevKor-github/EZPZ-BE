import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleUseCase } from '../application/create/create.use-case';
import { CreateArticleRequestDto } from '../application/create/dto/create.request.dto';
import { CreateArticleResponseDto } from '../application/create/dto/create.response.dto';
import { DeleteArticleUseCase } from '../application/delete/delete.use-case';
import { ArticleCommandDocs } from './article.command.docs';

@ApiTags('article')
@Controller('article')
export class ArticleCommandController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  @Post()
  @ArticleCommandDocs('create')
  async createArticle(@Body() reqDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    return await this.createArticleUseCase.execute(reqDto);
  }

  @Delete(':id')
  @ArticleCommandDocs('delete')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute(id);
  }
}
