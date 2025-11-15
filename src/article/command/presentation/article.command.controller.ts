import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleUseCase } from '../application/create-article/create-article.use-case';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { CreateArticleResponseDto } from '../application/create-article/dto/create-article.response.dto';
import { DeleteArticleUseCase } from '../application/delete-article/delete-article.use-case';
import { UpdateArticleUseCase } from '../application/update-article/update-article.use-case';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { ArticleCommandDocs } from './article.command.docs';
import { AuthGuard } from '@nestjs/passport';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';

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
    return await this.createArticleUseCase.execute({ ...reqDto, organizationId: '1' });
  }

  @Patch(':id')
  @ArticleCommandDocs('update')
  async updateArticle(@Param('id') id: string, @Body() reqDto: UpdateArticleRequestDto): Promise<void> {
    return await this.updateArticleUseCase.execute({ ...reqDto, id, organizationId: '1' });
  }

  @Delete(':id')
  @ArticleCommandDocs('delete')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute({ id, organizationId: '1' });
  }
}

@ApiTags('organization-article')
@Controller('organization/article')
export class OrganizationArticleCommandController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  @Post()
  @ArticleCommandDocs('create')
  @UseGuards(AuthGuard('jwt-access'))
  async createArticle(
    @User() user: UserPayload,
    @Body() reqDto: CreateArticleRequestDto,
  ): Promise<CreateArticleResponseDto> {
    return await this.createArticleUseCase.execute({ ...reqDto, organizationId: user.userId });
  }

  @Patch(':id')
  @ArticleCommandDocs('update')
  @UseGuards(AuthGuard('jwt-access'))
  async updateArticle(
    @User() user: UserPayload,
    @Param('id') id: string,
    @Body() reqDto: UpdateArticleRequestDto,
  ): Promise<void> {
    return await this.updateArticleUseCase.execute({ ...reqDto, id, organizationId: user.userId });
  }

  @Delete(':id')
  @ArticleCommandDocs('delete')
  @UseGuards(AuthGuard('jwt-access'))
  async delete(@User() user: UserPayload, @Param('id') id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute({ id, organizationId: user.userId });
  }
}
