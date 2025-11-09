import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthOrganizationUseCase } from '../application/create/create.use-case';
import { RegisterOrganizationRequestDto } from './dto/request/register-organization.request.dto';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { Response } from 'express';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { LogoutUseCase } from '../application/logout/logout.use-case';

@ApiTags('auth-organization')
@Controller('auth/organization')
export class AuthOrganizationController {
  constructor(
    private readonly createAuthOrganizationUseCase: CreateAuthOrganizationUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
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

  @Post('refresh')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { userId, jti } = user;
    const { newAccessToken, newRefreshToken } = await this.renewTokenUseCase.execute({
      organizationId: userId,
      jti: jti,
    });

    res.cookie('accessToken', newAccessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  async logout(@User() user: UserPayload, @Res() res: Response) {
    const { userId } = user;
    await this.logoutUseCase.execute({ organizationId: userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }
}
