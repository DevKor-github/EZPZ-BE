import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { BaseOAuthProvider, OAuthUser } from './base-oauth.provider';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string;
}

interface KakaoUserResponse {
  id: number;
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

@Injectable()
export class KakaoOAuthProvider implements BaseOAuthProvider {
  constructor(private readonly configService: ConfigService) {}

  async getUserInfo(token: string): Promise<OAuthUser> {
    const res = await axios.get<KakaoUserResponse>('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const oauthId = res.data.id.toString();
    if (!oauthId) throw new UnauthorizedException('Failed to get Kakao user ID');
    const email = res.data.kakao_account?.email;
    if (!email) throw new UnauthorizedException('Failed to get Kakao user email');
    const provider = OAuthProviderType.KAKAO;

    const oAuthUser = { oauthId, provider, email };

    return oAuthUser;
  }

  async getToken(code: string): Promise<string> {
    const clientId = this.configService.get<string>('kakao.clientId');
    const redirectUri = this.configService.get<string>('kakao.redirectUri');

    if (!clientId || !redirectUri) {
      throw new Error('Kakao clientId or redirectUri is not configured');
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('redirect_uri', redirectUri);
    params.append('code', code);

    const res = await axios.post<KakaoTokenResponse>('https://kauth.kakao.com/oauth/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    });

    if (!res.data.access_token) throw new UnauthorizedException('Invalid Kakao token');

    return res.data.access_token;
  }

  getAuthorizationUrl(): string {
    const authorizeUrl = 'https://kauth.kakao.com/oauth/authorize';
    const clientId = this.configService.get<string>('kakao.clientId');
    const redirectUri = this.configService.get<string>('kakao.redirectUri');

    if (!clientId || !redirectUri) {
      throw new Error('Kakao clientId or redirectUri is not configured');
    }

    const params = new URLSearchParams();
    params.append('response_type', 'code');
    params.append('client_id', clientId);
    params.append('redirect_uri', redirectUri);

    return `${authorizeUrl}?${params.toString()}`;
  }
}
