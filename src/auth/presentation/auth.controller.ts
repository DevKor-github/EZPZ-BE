import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Get('login/kakao')
  async kakaoLogin() {}

  @Get('login/kakao/callback')
  async kakaoLoginCallback() {}

  @Get('refresh')
  async renewToken() {}

  @Post('logout')
  async logout() {}
}
