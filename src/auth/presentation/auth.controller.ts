import { Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OAuthLoginUseCase } from '../application/oauth-login/oauth-login.use-case';
import { AuthorizeOAuthUseCase } from '../application/authorize-oauth/authorize-oauth.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';
import { LogoutUseCase } from '../application/logout/logout.use-case';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';
import { AuthDocs } from './auth.docs';

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
  @AuthDocs('oauthAuthorization')
  authorizeOAuth(@Res() res: Response) {
    const { authUrl } = this.authorizeOAuthUseCase.execute({ oAuthProviderType: OAuthProviderType.KAKAO });

    res.redirect(authUrl);
  }

  @Get('login/oauth/callback')
  @AuthDocs('oauthCallback')
  async oAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.oAuthLoginUseCase.execute({
      oAuthProviderType: OAuthProviderType.KAKAO,
      code,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @AuthDocs('renewToken')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({ userId: user.userId, jti: user.jti });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-access'))
  @AuthDocs('logout')
  async logout(@User() user: UserPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ userId: user.userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }
}
