import { Module } from '@nestjs/common';
import { OAuthProviderFactory } from './infrastructure/oauth/oauth-provider.factory';
import { KakaoOAuthProvider } from './infrastructure/oauth/kakao.provider';
import { AUTH_REPOSITORY } from 'src/auth/domain/repository/auth.repository';
import { AuthRepositoryImpl } from 'src/auth/infrastructure/repository/auth.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';

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
