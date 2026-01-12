import { Module } from '@nestjs/common';
import { OAuthLoginUseCase } from './application/oauth-login/oauth-login.use-case';
import { AuthorizeOAuthUseCase } from './application/authorize-oauth/authorize-oauth.use-case';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RenewTokenUseCase } from './application/renew-token/renew-token.use-case';
import { LogoutUseCase } from './application/logout/logout.use-case';
import { SharedModule } from 'src/shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UnlinkOAuthUseCase } from './application/unlink-oauth/unlink-oauth.use-case';
import { UnlinkOAuthListener } from './application/unlink-oauth/unlink-oauth.listener';
import { AUTH_USER_STORE } from './domain/auth-user.repository';
import { AuthUserStoreImpl } from './infrastructure/auth-user.store.impl';
import { AuthUserEntity } from './infrastructure/auth-user.entity';
import { AuthCoreModule } from '../auth-core/auth-core.module';
import { AuthUserController } from './presentation/auth-user.controller';
import { UserModule } from 'iam/user/user.module';
import { JwtUserAccessStrategy } from './infrastructure/jwt/jwt-access.strategy';
import { JwtUserRefreshStrategy } from './infrastructure/jwt/jwt-refresh.strategy';

const usecases = [OAuthLoginUseCase, AuthorizeOAuthUseCase, RenewTokenUseCase, LogoutUseCase, UnlinkOAuthUseCase];
const listeners = [UnlinkOAuthListener];
const jwt = [JwtUserAccessStrategy, JwtUserRefreshStrategy];

@Module({
  imports: [MikroOrmModule.forFeature([AuthUserEntity]), AuthCoreModule, SharedModule, CqrsModule, UserModule],
  providers: [
    {
      provide: AUTH_USER_STORE,
      useClass: AuthUserStoreImpl,
    },
    ...usecases,
    ...listeners,
    ...jwt,
  ],
  controllers: [AuthUserController],
  exports: [],
})
export class AuthUserModule {}
