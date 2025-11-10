import { Module } from '@nestjs/common';
import { AuthUserRepositoryImpl } from './infrastructure/auth-user.repository.impl';
import { AUTH_USER_REPOSITORY } from './domain/auth-user.repository';
import { OAuthLoginUseCase } from './application/oauth-login/oauth-login.handler';
import { AuthorizeOAuthUseCase } from './application/authorize-oauth/authorize-oauth.use-case';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthUserEntity } from './infrastructure/auth-user.entity';
import { AuthUserController } from './presentation/auth-user.controller';
import { RenewTokenUseCase } from './application/renew-token/renew-token.use-case';
import { LogoutUseCase } from './application/logout/logout.use-case';
import { AuthCoreModule } from '../core/auth-core.module';
import { SharedModule } from 'src/shared/shared.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UnlinkOAuthUseCase } from './application/unlink-oauth/unlink-oauth.use-case';
import { UnlinkOAuthListener } from './application/unlink-oauth/unlink-oauth.listener';

const usecases = [OAuthLoginUseCase, AuthorizeOAuthUseCase, RenewTokenUseCase, LogoutUseCase, UnlinkOAuthUseCase];
const listeners = [UnlinkOAuthListener];

@Module({
  imports: [MikroOrmModule.forFeature([AuthUserEntity]), AuthCoreModule, SharedModule, CqrsModule],
  providers: [
    {
      provide: AUTH_USER_REPOSITORY,
      useClass: AuthUserRepositoryImpl,
    },
    ...usecases,
    ...listeners,
  ],
  controllers: [AuthUserController],
  exports: [],
})
export class AuthUserModule {}
