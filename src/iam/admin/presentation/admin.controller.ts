import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAdminUseCase } from '../application/get/get-admin.use-case';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { Admin, AdminPayload } from 'src/shared/core/presentation/admin.decorator';
import { AdminView } from '../domain/admin.view';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly getAdminUseCase: GetAdminUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-admin-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getAdminInfo(@Admin() admin: AdminPayload): Promise<AdminView> {
    return await this.getAdminUseCase.execute({ adminId: admin.adminId });
  }
}
