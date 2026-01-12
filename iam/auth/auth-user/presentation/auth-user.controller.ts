import { Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthorizeOAuthUseCase } from '../application/authorize-oauth/authorize-oauth.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { RenewTokenUseCase } from '../application/renew-token/renew-token.use-case';
import { User, UserPayload } from 'src/shared/core/presentation/user.decorator';
import { LogoutUseCase } from '../application/logout/logout.use-case';
import { OAuthProviderType } from '../domain/value-object/oauth-provider.enum';
import { AuthUserDocs } from './auth-user.docs';
import { UnlinkOAuthUseCase } from '../application/unlink-oauth/unlink-oauth.use-case';
import { Roles } from 'src/shared/core/presentation/role.decorator';
import { OAuthLoginUseCase } from '../application/oauth-login/oauth-login.use-case';
import { RolesGuard } from 'iam/auth/auth-core/infrastructure/guard/role.guard';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';

@ApiTags('auth-user')
@Controller('auth')
export class AuthUserController {
  constructor(
    private readonly oAuthLoginUseCase: OAuthLoginUseCase,
    private readonly authorizeOAuthUseCase: AuthorizeOAuthUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly unlinkOAuthUseCase: UnlinkOAuthUseCase,
  ) {}

  @Get('oauth/authorization')
  @AuthUserDocs('oauthAuthorization')
  authorizeOAuth(@Query('returnPath') returnPath?: string) {
    const { authUrl } = this.authorizeOAuthUseCase.execute({
      oAuthProviderType: OAuthProviderType.KAKAO,
      redirectUrl: returnPath,
    });

    return { authUrl, returnPath };
  }

  @Post('login/oauth/callback')
  @AuthUserDocs('oauthCallback')
  async oAuthLogin(
    @Res() res: Response,
    @Query('code') code: string,
    @Query('error') error?: string,
    @Query('state') state?: string,
  ) {
    if (error && error === 'access_denied') {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Access denied' });
    }

    const { accessToken, refreshToken, userId, redirectUrl } = await this.oAuthLoginUseCase.execute({
      oAuthProviderType: OAuthProviderType.KAKAO,
      code,
      state,
    });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.json({ userId, redirectUrl });
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-user-refresh'), RolesGuard)
  @Roles(Role.USER)
  @AuthUserDocs('renewToken')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute({ userId: user.userId, jti: user.jti });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt-user-access'), RolesGuard)
  @Roles(Role.USER)
  @AuthUserDocs('logout')
  async logout(@User() user: UserPayload, @Res() res: Response) {
    await this.logoutUseCase.execute({ userId: user.userId });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.OK).send();
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt-user-access'), RolesGuard)
  @Roles(Role.USER)
  @AuthUserDocs('withdraw')
  async withdraw(@User() user: UserPayload, @Res() res: Response) {
    await this.unlinkOAuthUseCase.execute({ userId: user.userId, oAuthProviderType: OAuthProviderType.KAKAO });

    res.clearCookie('accessToken', accessTokenCookieOptions);
    res.clearCookie('refreshToken', refreshTokenCookieOptions);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
