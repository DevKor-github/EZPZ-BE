import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './infrastructure/jwt/jwt-refresh.strategy';
import { JwtAccessStrategy } from './infrastructure/jwt/jwt-access.strategy';
import { JwtProvider } from './infrastructure/jwt/jwt.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { KakaoOAuthProvider } from './infrastructure/oauth/kakao.provider';
import { OAuthProviderFactory } from './infrastructure/oauth/oauth-provider.factory';

const jwt = [JwtProvider, JwtAccessStrategy, JwtRefreshStrategy];
const oAuth = [OAuthProviderFactory, KakaoOAuthProvider];

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [...jwt, ...oAuth],
  controllers: [],
  exports: [OAuthProviderFactory, ...jwt],
})
export class AuthCoreModule {}
