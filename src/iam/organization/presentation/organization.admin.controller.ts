import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllOrganizationsUseCase } from '../application/get-all/get-all-organizations.use-case';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { GetAllOrganizationsRequestDto } from './dto/request/get-all-organizations.request.dto';

@ApiTags('admin-organization')
@Controller('admin/organization')
export class OrganizationAdminController {
  constructor(private readonly getAllOrganizationsUseCase: GetAllOrganizationsUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getAll(@Query() query: GetAllOrganizationsRequestDto) {
    return await this.getAllOrganizationsUseCase.execute({
      pageSize: query.pageSize,
      cursorId: query.cursorId,
      cursorDate: query.cursorDate ? new Date(query.cursorDate) : undefined,
    });
  }
}
