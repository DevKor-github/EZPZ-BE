import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY } from './domain/repository/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repository/auth.repository.impl';
import { AuthController } from './presentation/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from './infrastructure/orm-entity/auth.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { OAuthLoginUseCase } from './application/oauth-login/oauth-login.use-case';
import { OAuthProviderFactory } from './infrastructure/factory/oauth-provider.factory';
import { KakaoOAuthProvider } from './infrastructure/provider/kakao.provider';
import { AuthorizeOAuthUseCase } from './application/authorize-oauth/authorize-oauth.use-case';
import { JwtProvider } from './infrastructure/provider/jwt.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './infrastructure/strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './infrastructure/strategy/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { RenewTokenUseCase } from './application/renew-token/renew-token.use-case';
import { LogoutUseCase } from './application/logout/logout.use-case';
import { UserModule } from 'src/user/user.module';

const useCases = [OAuthLoginUseCase, AuthorizeOAuthUseCase, RenewTokenUseCase, LogoutUseCase];

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register({}), MikroOrmModule.forFeature([AuthEntity, UserEntity]), PassportModule, UserModule],
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
})
export class AuthModule {}
