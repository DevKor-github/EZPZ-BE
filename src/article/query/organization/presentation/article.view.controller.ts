import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { ArticleModel } from '../domain/article.model';
import { GetOrganizationArticleListUseCase } from '../application/article-list/get-article-list.use-case';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { OrganizationArticleViewDocs } from './article.view.docs';
import { RolesGuard } from 'iam/auth/auth-core/infrastructure/guard/role.guard';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@ApiTags('organization-article')
@Controller('organization/article')
export class ArticleOrganizationViewController {
  constructor(private readonly getOrganizationArticleListUseCase: GetOrganizationArticleListUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @OrganizationArticleViewDocs('list')
  async getArticleList(@Organization() organization: OrganizationPayload): Promise<ArticleModel[]> {
    return await this.getOrganizationArticleListUseCase.execute({ organizationId: organization.organizationId });
  }
}
