import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from './infrastructure/jwt/jwt-refresh.strategy';
import { JwtAccessStrategy } from './infrastructure/jwt/jwt-access.strategy';
import { JwtProvider } from './infrastructure/jwt/jwt.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { OAuthProviderFactory } from 'src/auth/core/infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from './infrastructure/oauth/kakao.provider';

const jwt = [JwtProvider, JwtAccessStrategy, JwtRefreshStrategy];

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [...jwt, OAuthProviderFactory, KakaoOAuthProvider],
  controllers: [],
  exports: [OAuthProviderFactory, ...jwt],
})
export class AuthCoreModule {}
