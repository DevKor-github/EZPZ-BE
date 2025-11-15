import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { UserModel } from '../domain/user.model';
import { GetMyInfoUseCase } from '../application/get-my-info/get-my-info.use-case';
import { UserQueryDocs } from './user.query.docs';
import { RolesGuard } from 'src/auth/core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'src/auth/core/domain/value-object/role';

@ApiTags('user')
@Controller('user')
export class UserQueryController {
  constructor(private readonly getMyInfoUseCase: GetMyInfoUseCase) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.USER)
  @UserQueryDocs('getMyInfo')
  async getMyInfo(@User() user: UserPayload): Promise<UserModel> {
    return await this.getMyInfoUseCase.execute({ userId: user.userId });
  }
}
