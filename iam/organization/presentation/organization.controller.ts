import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationDocs } from './organization.docs';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';
import { UpdateOrganizationUseCase } from '../application/update/update.use-case';
import { UpdateOrganizationReqDto } from './dto/request/update-organization.request.dto';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly updateOrganizationUseCase: UpdateOrganizationUseCase) {}

  @Patch()
  @UseGuards(AuthGuard('jwt-access'))
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
}
