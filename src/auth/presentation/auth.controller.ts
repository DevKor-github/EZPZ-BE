import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OAuthLoginUseCase } from '../application/use-case/oauth-login.use-case';
import { Response } from 'express';
import { AuthorizeOAuthUseCase } from '../application/use-case/authorize-oauth.use-case';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from 'src/shared/config/cookie.config';
import { AuthGuard } from '@nestjs/passport';
import { RenewTokenUseCase } from '../application/use-case/renew-token.use-case';
import { User, UserPayload } from 'src/shared/presentation/decorator/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly oAuthLoginUseCase: OAuthLoginUseCase,
    private readonly authorizeOAuthUseCase: AuthorizeOAuthUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
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

    res.status(200).send();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  async renewToken(@User() user: UserPayload, @Res() res: Response) {
    console.log(`controller userID ${user.userId}`);
    const { accessToken, refreshToken } = await this.renewTokenUseCase.execute(user.userId);

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.status(200).send();
  }

  @Post('logout')
  async logout() {}
}
