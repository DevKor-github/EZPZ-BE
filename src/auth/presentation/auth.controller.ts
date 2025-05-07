import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OAuthLoginUseCase } from '../application/use-case/oauth-login.use-case';
import { Response } from 'express';
import { AuthorizeOAuthUseCase } from '../application/use-case/authorize-oauth.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly oAuthLoginUseCase: OAuthLoginUseCase,
    private readonly authorizeOAuthUseCase: AuthorizeOAuthUseCase,
  ) {}

  @Get('oauth/authorization')
  authorizeOAuth(@Res() res: Response) {
    const kakaoAuthUrl = this.authorizeOAuthUseCase.execute('kakao');

    return res.redirect(kakaoAuthUrl);
  }

  @Get('login/oauth/callback')
  async oAuthLogin(@Query('code') code: string, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.oAuthLoginUseCase.execute('kakao', code);

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.send();
  }

  @Get('refresh')
  async renewToken() {}

  @Post('logout')
  async logout() {}
}
