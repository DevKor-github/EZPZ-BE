import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/auth/domain/entity/auth';
import { AuthRepository } from 'src/auth/domain/repository/auth.repository';
import { TokenType } from 'src/auth/infrastructure/factory/jwt.factory';
import { OAuthProviderFactory } from 'src/auth/infrastructure/factory/oauth-provider.factory';
import { AuthEntity } from 'src/auth/infrastructure/orm-entity/auth.entity';
import { JwtProvider } from 'src/auth/infrastructure/provider/jwt.provider';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { CreateUserUseCase } from 'src/user/application/use-case/create-user.use-case';
import { Role } from 'src/user/domain/value-object/role.enum';

@Injectable()
export class OAuthLoginUseCase {
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    @InjectRepository(AuthEntity)
    private readonly authRepository: AuthRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(providerName: string, code: string) {
    // 카카오 로그인 정보 가져오기기
    const oAuthprovider = this.oAuthProviderFactory.getProvider(providerName);
    const token = await oAuthprovider.getToken(code);
    const { oauthId, provider, email } = await oAuthprovider.getUserInfo(token);

    // findOrCreateUser
    let auth: Auth;
    const now = new Date();

    const existingAuth = await this.authRepository.findByOAuthIdandProvider(oauthId, provider);

    if (existingAuth) auth = existingAuth;
    else {
      const userId = Identifier.create();
      await this.createUserUseCase.execute(userId, email, Role.GENERAL);

      auth = Auth.create({
        id: Identifier.create(),
        createdAt: now,
        updatedAt: now,
        oauthId: oauthId,
        provider: provider,
        refreshToken: '',
        userId: userId,
      });

      await this.authRepository.save(auth);
    }

    const { token: accessToken } = await this.jwtProvider.generateToken(TokenType.ACCESS, auth.userId.value);
    const { token: refreshToken, jti } = await this.jwtProvider.generateToken(TokenType.REFRESH, auth.userId.value);

    auth.updateRefreshToken(jti, now);
    await this.authRepository.update(auth);

    return { accessToken, refreshToken };
  }
}
