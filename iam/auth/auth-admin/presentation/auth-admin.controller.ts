import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AdminLoginUseCase } from '../application/login/login.use-case';
import { ApiTags } from '@nestjs/swagger';
import { AdminLoginRequestDto } from './dto/request/login.request.dto';
import { Response } from 'express';
import { accessTokenCookieOptions } from 'src/shared/config/cookie.config';
import { RegisterAdminUseCase } from '../application/register/register-admin.use-case';
import { RegisterAdminRequestDto } from './dto/request/register.-admin.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'iam/auth/auth-core/infrastructure/guard/role.guard';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@ApiTags('Auth Admin')
@Controller('auth/admin')
export class AuthAdminController {
  constructor(
    private readonly registerAdminUseCase: RegisterAdminUseCase,
    private readonly adminLoginUseCase: AdminLoginUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterAdminRequestDto, @Res() res: Response): Promise<void> {
    const { accountId, password, name } = dto;
    const { accessToken } = await this.registerAdminUseCase.execute({
      accountId: accountId,
      password: password,
      name: name,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.status(HttpStatus.CREATED).send();
  }

  @Post('login')
  async login(@Body() dto: AdminLoginRequestDto, @Res() res: Response): Promise<void> {
    const { accountId, password } = dto;
    const { accessToken } = await this.adminLoginUseCase.execute({
      accountId: accountId,
      password: password,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-access'), RolesGuard)
  @Roles(Role.ADMIN)
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');

    res.status(HttpStatus.OK).send();
  }
}
