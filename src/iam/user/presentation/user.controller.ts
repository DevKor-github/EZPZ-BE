import { Controller, Delete, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { UserDocs } from './user.docs';
import { Response } from 'express';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { DeleteMyInfoCommand } from '../application/delete/delete.command';
import { DeleteUserUseCase } from '../application/delete/delete.use-case';
import { GetUserUseCase } from '../application/get/get-user.use-case';
import { UserView } from '../domain/user.view';
import { RolesGuard } from 'src/iam/auth/auth-core/infrastructure/guard/role.guard';
import { Role } from 'src/iam/auth/auth-core/domain/value-object/role';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Delete('me')
  @UseGuards(AuthGuard('jwt-user-access'), RolesGuard)
  @Roles(Role.USER)
  @UserDocs('deleteUser')
  async deleteUser(@User() user: UserPayload, @Res() res: Response) {
    const command = new DeleteMyInfoCommand(user.userId);
    await this.deleteUserUseCase.execute(command);

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt-user-access'), RolesGuard)
  @Roles(Role.USER)
  @UserDocs('getUser')
  async getMyInfo(@User() user: UserPayload): Promise<UserView> {
    return await this.getUserUseCase.execute({ userId: user.userId });
  }
}
