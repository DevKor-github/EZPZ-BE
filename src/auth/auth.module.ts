import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY } from './domain/repository/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repository/auth.repository.impl';
import { AuthController } from './presentation/auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from './infrastructure/orm-entity/auth.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { OAuthLoginUseCase } from './application/use-case/oauth-login.use-case';
import { OAuthProviderFactory } from './infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from './infrastructure/oauth/kakao.provider';
import { AuthorizeOAuthUseCase } from './application/use-case/authorize-oauth.use-case';

@Module({
  controllers: [AuthController],
  imports: [MikroOrmModule.forFeature([AuthEntity, UserEntity])],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
    OAuthLoginUseCase,
    AuthorizeOAuthUseCase,
    OAuthProviderFactory,
    KakaoOAuthProvider,
  ],
})
export class AuthModule {}
