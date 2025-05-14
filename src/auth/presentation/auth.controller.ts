import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OAuthLoginUseCase } from '../application/oauth-login/oauth-login.use-case';
import { AuthorizeOAuthUseCase } from '../application/authorize-oauth/authorize-oauth.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { LogoutUseCase } from '../application/logout/logout.use-case';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly oAuthLoginUseCase: OAuthLoginUseCase,
    private readonly authorizeOAuthUseCase: AuthorizeOAuthUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Get('oauth/authorization')
  authorizeOAuth(@Res() res: Response) {
    const { authUrl } = this.authorizeOAuthUseCase.execute({ providerName: 'kakao' });

    res.redirect(authUrl);
  }

  @Get('login/oauth/callback')
  async oAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.oAuthLoginUseCase.execute({ providerName: 'kakao', code });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(200).send();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({ userId: user.userId, jti: user.jti });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(200).send();
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  async logout(@User() user: UserPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ userId: user.userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(200).send();
  }
}
