import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { ArticleModel } from '../domain/article.model';
import { GetOrganizationArticleListUseCase } from '../application/article-list/get-article-list.use-case';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { OrganizationArticleViewDocs } from './article.view.docs';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { GetArticleSummariesUseCase } from '../application/article-summary/get-article-summaries.use-case';
import { GetArticleSummariesRequestDto } from './dto/request/get-article-summaries.request.dto';
import { GetArticleAdminUseCase } from '../application/article/get-article.use-case';

@ApiTags('organization-article')
@Controller('organization/article')
export class ArticleOrganizationViewController {
  constructor(private readonly getOrganizationArticleListUseCase: GetOrganizationArticleListUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-organization-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @OrganizationArticleViewDocs('list')
  async getArticleList(@Organization() organization: OrganizationPayload): Promise<ArticleModel[]> {
    return await this.getOrganizationArticleListUseCase.execute({ organizationId: organization.organizationId });
  }
}

@ApiTags('admin-article')
@Controller('admin/article')
export class ArticleAdminViewController {
  constructor(
    private readonly getArticleSummariesUseCase: GetArticleSummariesUseCase,
    private readonly getArticleAdminUseCase: GetArticleAdminUseCase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt-admin-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getArticleSummaries(@Query() query: GetArticleSummariesRequestDto) {
    return await this.getArticleSummariesUseCase.execute({
      pageSize: query.pageSize,
      cursorId: query.cursorId,
      cursorDate: query.cursorDate ? new Date(query.cursorDate) : undefined,
    });
  }

  @Get(':articleId')
  @UseGuards(AuthGuard('jwt-admin-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getArticle(@Param('articleId') articleId: string) {
    return await this.getArticleAdminUseCase.execute({ articleId });
  }
}
