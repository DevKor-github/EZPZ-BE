import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user/domain/auth-user';
import { TokenType } from 'src/auth/core/infrastructure/jwt/jwt.factory';
import { OAuthProviderFactory } from 'src/auth/core/infrastructure/oauth/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/auth-user/domain/value-object/oauth-provider.enum';
import { JwtProvider } from 'src/auth/core/infrastructure/jwt/jwt.provider';
import { Identifier } from 'src/shared/core/domain/identifier';
import { OAuthLoginResponseDto } from './dto/oauth-login.response.dto';
import { Transactional } from '@mikro-orm/core';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AuthCreatedEvent } from 'src/auth/auth-user/domain/event/auth-created.event';
import { OAuthLoginCommand } from './oauth-login.command';
import { AUTH_USER_REPOSITORY, AuthUserRepository } from '../../domain/auth-user.repository';
import { Role } from 'src/auth/core/domain/value-object/role';

@Injectable()
@CommandHandler(OAuthLoginCommand)
export class OAuthLoginUseCase {
  private readonly now: Date;
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_USER_REPOSITORY)
    private readonly authUserRepository: AuthUserRepository,
    private readonly eventBus: EventBus,
  ) {
    this.now = new Date();
  }

  @Transactional()
  async execute(command: OAuthLoginCommand): Promise<OAuthLoginResponseDto> {
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
    const existingAuth = await this.authUserRepository.findByOAuthIdandProvider(oauthId, provider);
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

    await this.authUserRepository.save(authUser);

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
    await this.authUserRepository.update(authUser);

    return { accessToken, refreshToken };
  }

  // 리다이렉트 url 복호화 및 반환
  private decodeRedirectUrl(state?: string): string {
    if (!state) return '';

    const decodedState = decodeURIComponent(state);

    return decodedState;
  }
}
