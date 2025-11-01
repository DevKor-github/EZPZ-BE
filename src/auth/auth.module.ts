import { Module } from '@nestjs/common';
import { AuthRepositoryImpl } from './auth-user/infrasturcture/auth.repository.impl';
import { AuthController } from './auth-user/presentation/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from './auth-user/infrasturcture/auth.entity';
import { OAuthLoginUseCase } from './auth-user/application/oauth-login/oauth-login.handler';
import { OAuthProviderFactory } from '../shared/core/infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from '../shared/core/infrastructure/oauth/kakao.provider';
import { AuthorizeOAuthUseCase } from './auth-user/application/authorize-oauth/authorize-oauth.use-case';
import { JwtProvider } from './infrastructure/jwt/jwt.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './infrastructure/jwt/jwt-access.strategy';
import { JwtRefreshStrategy } from './infrastructure/jwt/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { RenewTokenUseCase } from './auth-user/application/renew-token/renew-token.use-case';
import { LogoutUseCase } from './auth-user/application/logout/logout.use-case';
import { SharedModule } from 'src/shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AUTH_REPOSITORY } from './auth-user/domain/auth.repository';

const useCases = [OAuthLoginUseCase, AuthorizeOAuthUseCase, RenewTokenUseCase, LogoutUseCase];

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), MikroOrmModule.forFeature([AuthEntity]), PassportModule, SharedModule, CqrsModule],
  providers: [
    ...useCases,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
    OAuthProviderFactory,
    KakaoOAuthProvider,
    JwtProvider,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [OAuthProviderFactory],
})
export class AuthModule {}
