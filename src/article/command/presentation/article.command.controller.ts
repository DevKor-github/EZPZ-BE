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
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { RolesGuard } from 'src/auth/core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/auth/core/domain/value-object/role';

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
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @ArticleCommandDocs('create')
  async createArticle(
    @Organization() organization: OrganizationPayload,
    @Body() reqDto: CreateArticleRequestDto,
  ): Promise<CreateArticleResponseDto> {
    return await this.createArticleUseCase.execute({ ...reqDto, organizationId: organization.organizationId });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @ArticleCommandDocs('update')
  async updateArticle(
    @Organization() organization: OrganizationPayload,
    @Param('id') id: string,
    @Body() reqDto: UpdateArticleRequestDto,
  ): Promise<void> {
    return await this.updateArticleUseCase.execute({ ...reqDto, id, organizationId: organization.organizationId });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @ArticleCommandDocs('delete')
  async delete(@Organization() organization: OrganizationPayload, @Param('id') id: string): Promise<void> {
    return await this.deleteArticleUseCase.execute({ id, organizationId: organization.organizationId });
  }
}
