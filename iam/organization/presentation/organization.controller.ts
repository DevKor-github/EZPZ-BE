import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationDocs } from './organization.docs';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { UpdateOrganizationUseCase } from '../application/update/update.use-case';
import { UpdateOrganizationReqDto } from './dto/request/update-organization.request.dto';
import { OrganizationView } from '../domain/organization.view';
import { GetOrganizationUseCase } from '../application/get/get-organization.use-case';
import { RolesGuard } from 'iam/auth/auth-core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly getOrganizationUseCase: GetOrganizationUseCase,
  ) {}

  @Patch()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @OrganizationDocs('update')
  async updateOrganization(
    @Organization() organization: OrganizationPayload,
    @Body() dto: UpdateOrganizationReqDto,
  ): Promise<void> {
    await this.updateOrganizationUseCase.execute({
      organizationId: organization.organizationId,
      name: dto.name,
      contact: dto.contact,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ORGANIZATION)
  @OrganizationDocs('get')
  async getOrganization(@Organization() organization: OrganizationPayload): Promise<OrganizationView> {
    return await this.getOrganizationUseCase.execute({
      organizationId: organization.organizationId,
    });
  }
}
