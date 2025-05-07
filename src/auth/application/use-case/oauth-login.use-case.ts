import { Injectable } from '@nestjs/common';
import { TokenType } from 'src/auth/infrastructure/factory/jwt.factory';
import { OAuthProviderFactory } from 'src/auth/infrastructure/oauth/oauth-provider.factory';
import { JwtProvider } from 'src/auth/infrastructure/provider/jwt.provider';

@Injectable()
export class OAuthLoginUseCase {
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly jwtProvider: JwtProvider,
    // private readonly userService: UserService,
  ) {}

  async execute(providerName: string, code: string) {
    const provider = this.oAuthProviderFactory.getProvider(providerName);
    const token = await provider.getToken(code);
    const userInfo = await provider.getUserInfo(token);
    const accessToken = await this.jwtProvider.generateToken(TokenType.ACCESS, 1);
    const refreshToken = await this.jwtProvider.generateToken(TokenType.REFRESH, 1);
    console.log('userInfo', userInfo);

    return { accessToken, refreshToken };
  }
}
