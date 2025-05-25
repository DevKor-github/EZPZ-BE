import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { TokenType } from 'src/auth/infrastructure/factory/jwt.factory';
import { OAuthProviderFactory } from 'src/auth/infrastructure/factory/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { JwtProvider } from 'src/auth/infrastructure/provider/jwt.provider';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { CreateUserUseCase } from 'src/user/application/create-user/create-user.use-case';
import { Role } from 'src/user/domain/value-object/role.enum';
import { OAuthLoginRequestDto } from './dto/oauth-login.request.dto';
import { OAuthLoginResponseDto } from './dto/oauth-login.response.dto';
import { Transactional } from '@mikro-orm/core';

@Injectable()
export class OAuthLoginUseCase {
  private readonly now: Date;
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @InjectRepository(AuthEntity)
    private readonly authRepository: AuthRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {
    this.now = new Date();
  }

  @Transactional()
  async execute(requestDto: OAuthLoginRequestDto): Promise<OAuthLoginResponseDto> {
    const { oAuthProviderType, code } = requestDto;
    const { oauthId, provider, email } = await this.getOAuthUserInfo(oAuthProviderType, code);
    const auth = await this.findOrCreateUser(oauthId, provider, email);
    const { accessToken, refreshToken } = await this.generateAndSaveTokens(auth);

    return { accessToken, refreshToken };
  }

  // 소셜로그인 유저저 정보 가져오기
  private async getOAuthUserInfo(oAuthProviderType: OAuthProviderType, code: string) {
    const oAuthprovider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const token = await oAuthprovider.getToken(code);

    return await oAuthprovider.getUserInfo(token);
  }

  // 유저 생성 및 정보 가져오기
  private async findOrCreateUser(oauthId: string, provider: OAuthProviderType, email: string): Promise<Auth> {
    const existingAuth = await this.authRepository.findByOAuthIdandProvider(oauthId, provider);
    if (existingAuth) return existingAuth;

    const userId = Identifier.create();
    await this.createUserUseCase.execute({
      userId,
      email,
      role: Role.GENERAL,
    });

    const auth = Auth.create({
      id: Identifier.create(),
      createdAt: this.now,
      updatedAt: this.now,
      oauthId: oauthId,
      provider: provider,
      refreshToken: null,
      userId: userId,
    });

    await this.authRepository.save(auth);

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
