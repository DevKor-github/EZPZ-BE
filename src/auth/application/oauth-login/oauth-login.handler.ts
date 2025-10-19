import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entity/auth';
import { AUTH_REPOSITORY, AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { TokenType } from 'src/auth/infrastructure/jwt/jwt.factory';
import { OAuthProviderFactory } from 'src/shared/core/infrastructure/oauth/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';
import { JwtProvider } from 'src/auth/infrastructure/jwt/jwt.provider';
import { Identifier } from 'src/shared/core/domain/identifier';
import { OAuthLoginResponseDto } from './dto/oauth-login.response.dto';
import { Transactional } from '@mikro-orm/core';
import { Role } from 'src/user/command/domain/value-object/role.enum';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AuthCreatedEvent } from 'src/auth/domain/event/auth-created.event';
import { OAuthLoginCommand } from './oauth-login.command';

@Injectable()
@CommandHandler(OAuthLoginCommand)
export class OAuthLoginUseCase {
  private readonly now: Date;
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
    private readonly eventBus: EventBus,
  ) {
    this.now = new Date();
  }

  @Transactional()
  async execute(command: OAuthLoginCommand): Promise<OAuthLoginResponseDto> {
    const { oAuthProviderType, code } = command;
    const { oauthId, provider, email } = await this.getOAuthUserInfo(oAuthProviderType, code);
    const auth = await this.findOrCreateAuth(oauthId, provider, email);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(auth);

    return { accessToken, refreshToken, userId: auth.userId.value };
  }

  // 소셜로그인 유저저 정보 가져오기
  private async getOAuthUserInfo(oAuthProviderType: OAuthProviderType, code: string) {
    const oAuthprovider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const token = await oAuthprovider.getToken(code);

    return await oAuthprovider.getUserInfo(token);
  }

  // 유저 생성 및 정보 가져오기
  private async findOrCreateAuth(oauthId: string, provider: OAuthProviderType, email: string): Promise<Auth> {
    const existingAuth = await this.authRepository.findByOAuthIdandProvider(oauthId, provider);
    if (existingAuth) {
      this.eventBus.publish(existingAuth);
      return existingAuth;
    }

    const userId = Identifier.create();

    await this.eventBus.publish(new AuthCreatedEvent(userId, email, Role.GENERAL, provider));

    const auth = Auth.create({
      id: Identifier.create(),
      createdAt: this.now,
      updatedAt: this.now,
      oauthId: oauthId,
      provider: provider,
      refreshToken: null,
      oauthAccessToken: null,
      userId: userId,
    });

    await this.authRepository.save(auth);

    await this.eventBus.publishAll(auth.pullDomainEvents());

    return auth;
  }

  // 토큰 생성 및 저장
  private async generateAndSaveTokens(auth: Auth) {
    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, auth.userId.value);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(TokenType.REFRESH, auth.userId.value);

    auth.updateRefreshToken(jti, this.now);
    await this.authRepository.update(auth);

    return { accessToken, refreshToken };
  }
}
