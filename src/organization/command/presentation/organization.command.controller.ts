import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrganizationUseCase } from '../application/update-organization/update-organization.use-case';
import { UpdateOrganizationDto } from './dto/request/update-organization.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationCommandDocs } from './organization.command.docs';
import { Organization, OrganizationPayload } from 'src/shared/core/presentation/organization.decorator';

@ApiTags('organization')
@Controller('organization')
export class OrganizationCommandController {
  constructor(private readonly updateOrganizationUseCase: UpdateOrganizationUseCase) {}

  @Patch()
  @UseGuards(AuthGuard('jwt-access'))
  @OrganizationCommandDocs('update')
  async update(@Organization() organization: OrganizationPayload, @Body() dto: UpdateOrganizationDto): Promise<void> {
    await this.updateOrganizationUseCase.execute({
      organizationId: organization.organizationId,
      name: dto.name,
      contact: dto.contact,
    });
  }
}
