import { Injectable } from '@nestjs/common';
import { BaseOAuthProvider } from './base-oauth.provider';
import { KakaoOAuthProvider } from './kakao.provider';

@Injectable()
export class OAuthProviderFactory {
  private readonly providers: Record<string, BaseOAuthProvider>;

  constructor(kakao: KakaoOAuthProvider) {
    this.providers = { kakao: kakao };
  }

  getProvider(providerName: string): BaseOAuthProvider {
    const provider = this.providers[providerName];
    if (!provider) throw new Error(`OAuth provider ${providerName} not found`);
    return provider;
  }
}
