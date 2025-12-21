import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllOrganizationsUseCase } from '../application/get-all/get-all-organizations.use-case';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'iam/auth/auth-core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@ApiTags('admin-organization')
@Controller('admin/organization')
export class OrganizationAdminController {
  constructor(private readonly getAllOrganizationsUseCase: GetAllOrganizationsUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getAll() {
    return await this.getAllOrganizationsUseCase.execute();
  }
}
