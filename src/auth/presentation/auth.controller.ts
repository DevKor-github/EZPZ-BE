import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OAuthLoginUseCase } from '../application/use-case/oauth-login.use-case';
import { Response } from 'express';
import { AuthorizeOAuthUseCase } from '../application/use-case/authorize-oauth.use-case';

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
  async oAuthLogin(@Query('code') code: string) {
    await this.oAuthLoginUseCase.execute('kakao', code);
  }

  @Get('refresh')
  async renewToken() {}

  @Post('logout')
  async logout() {}
}
