import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthOrganizationUseCase } from '../application/create/create.use-case';
import { RegisterOrganizationRequestDto } from './dto/request/register-organization.request.dto';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { Response } from 'express';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { LogoutUseCase } from '../application/logout/logout.use-case';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginUseCase } from '../application/login/login.use-case';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth-organization')
@Controller('auth/organization')
export class AuthOrganizationController {
  constructor(
    private readonly createAuthOrganizationUseCase: CreateAuthOrganizationUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  async registerOrganization(@Body() dto: RegisterOrganizationRequestDto) {
    await this.createAuthOrganizationUseCase.execute({
      accountId: dto.accountId,
      password: dto.password,
      name: dto.name,
      contact: dto.contact,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.execute({
      accountId: dto.accountId,
      password: dto.password,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { userId, jti } = user;
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({
      organizationId: userId,
      jti: jti,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-access'))
  async logout(@User() user: UserPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ organizationId: user.userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }
}
