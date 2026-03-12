import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllUsersUseCase } from '../application/get-all/get-all-users.use-case';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';
import { GetAllUsersRequestDto } from './dto/request/get-all-users.request.dto';

@ApiTags('admin-user')
@Controller('admin/user')
export class UserAdminController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get()
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ADMIN)
  async getAll(@Query() query: GetAllUsersRequestDto) {
    return await this.getAllUsersUseCase.execute({
      pageSize: query.pageSize,
      cursorId: query.cursorId,
      cursorDate: query.cursorDate ? new Date(query.cursorDate) : undefined,
    });
  }
}
