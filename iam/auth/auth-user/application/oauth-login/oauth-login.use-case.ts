import { Inject, Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Transactional } from '@mikro-orm/core';
import { EventBus } from '@nestjs/cqrs';
import { OAuthLoginCommand } from './oauth-login.command';
import { AUTH_USER_STORE, AuthUserStore } from '../../domain/auth-user.repository';
import { OAuthLoginResult } from './oauth-login.result';
import { OAuthProviderFactory } from 'iam/auth/auth-core/infrastructure/oauth/oauth-provider.factory';
import { JwtProvider } from 'iam/auth/auth-core/infrastructure/jwt/jwt.provider';
import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';
import { AuthUser } from '../../domain/auth-user';
import { AuthCreatedEvent } from '../../domain/event/auth-created.event';
import { Role } from 'iam/auth/auth-core/domain/value-object/role';
import { TokenType } from 'iam/auth/auth-core/infrastructure/jwt/jwt.factory';

@Injectable()
export class OAuthLoginUseCase {
  private readonly now: Date;
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_USER_STORE)
    private readonly authUserStore: AuthUserStore,
    private readonly eventBus: EventBus,
  ) {
    this.now = new Date();
  }

  @Transactional()
  async execute(command: OAuthLoginCommand): Promise<OAuthLoginResult> {
    const { oAuthProviderType, code } = command;
    const { oauthId, provider, email } = await this.getOAuthUserInfo(oAuthProviderType, code);
    const authUser = await this.findOrCreateAuth(oauthId, provider, email);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(authUser);
    const redirectUrl = this.decodeRedirectUrl(command.state);

    return { accessToken, refreshToken, userId: authUser.userId.value, redirectUrl };
  }

  // 소셜로그인 유저저 정보 가져오기
  private async getOAuthUserInfo(oAuthProviderType: OAuthProviderType, code: string) {
    const oAuthprovider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const token = await oAuthprovider.getToken(code);

    return await oAuthprovider.getUserInfo(token);
  }

  // 유저 생성 및 정보 가져오기
  private async findOrCreateAuth(oauthId: string, provider: OAuthProviderType, email: string): Promise<AuthUser> {
    const existingAuth = await this.authUserStore.findByOAuthIdandProvider(oauthId, provider);
    if (existingAuth) {
      this.eventBus.publish(existingAuth);
      return existingAuth;
    }

    const userId = Identifier.create();

    await this.eventBus.publish(new AuthCreatedEvent(userId, email, provider));

    const authUser = AuthUser.create({
      id: Identifier.create(),
      createdAt: this.now,
      updatedAt: this.now,
      oauthId: oauthId,
      provider: provider,
      refreshToken: null,
      oauthAccessToken: null,
      userId: userId,
    });

    await this.authUserStore.save(authUser);

    await this.eventBus.publishAll(authUser.pullDomainEvents());

    return authUser;
  }

  // 토큰 생성 및 저장
  private async generateAndSaveTokens(authUser: AuthUser) {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, authUser.userId.value, [
      Role.USER,
    ]);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(
      TokenType.REFRESH,
      authUser.userId.value,
      [Role.USER],
    );

    authUser.updateRefreshToken(jti, this.now);
    await this.authUserStore.update(authUser);

    return { accessToken, refreshToken };
  }

  // 리다이렉트 url 복호화 및 반환
  private decodeRedirectUrl(state?: string): string {
    if (!state) return '';

    const decodedState = decodeURIComponent(state);

    return decodedState;
  }
}
