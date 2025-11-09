import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrganizationUseCase } from '../application/update-organization/update-organization.use-case';
import { UpdateOrganizationDto } from './dto/request/update-organization.request.dto';

@ApiTags('organization')
@Controller('organization')
export class OrganizationCommandController {
  constructor(private readonly updateOrganizationUseCase: UpdateOrganizationUseCase) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto): Promise<void> {
    await this.updateOrganizationUseCase.execute({
      organizationId: id,
      name: dto.name,
      contact: dto.contact,
    });
  }
}
