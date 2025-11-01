import { Module } from '@nestjs/common';
import { OAuthProviderFactory } from './core/infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from './core/infrastructure/oauth/kakao.provider';
import { AuthRepositoryImpl } from 'src/auth/auth-user/infrasturcture/auth.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from 'src/auth/auth-user/infrasturcture/auth.entity';
import { AUTH_REPOSITORY } from 'src/auth/auth-user/domain/auth.repository';

@Module({
  imports: [MikroOrmModule.forFeature([AuthEntity])],
  providers: [
    OAuthProviderFactory,
    KakaoOAuthProvider,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: [OAuthProviderFactory],
})
export class SharedModule {}
