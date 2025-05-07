import { Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/auth/infrastructure/oauth/oauth-provider.factory';

@Injectable()
export class OAuthLoginUseCase {
  constructor(
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    // private readonly userService: UserService,
  ) {}

  async execute(providerName: string, code: string) {
    const provider = this.oAuthProviderFactory.getProvider(providerName);
    const token = await provider.getToken(code);
    const userInfo = await provider.getUserInfo(token);
    console.log('userInfo', userInfo);
  }
}
