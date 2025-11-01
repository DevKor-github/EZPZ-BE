import { Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/shared/core/infrastructure/oauth/oauth-provider.factory';
import { AuthorizeOAuthRequestDto } from './dto/authorize-oauth.request.dto';
import { AuthorizeOAuthResponseDto } from './dto/authorize-oauth.response.dto';

@Injectable()
export class AuthorizeOAuthUseCase {
  constructor(private readonly oAuthProviderFactory: OAuthProviderFactory) {}

  execute(requestDto: AuthorizeOAuthRequestDto): AuthorizeOAuthResponseDto {
    const { oAuthProviderType, redirectUrl } = requestDto;
    const provider = this.oAuthProviderFactory.getProvider(oAuthProviderType);

    const encodedState = encodeURIComponent(redirectUrl || '');

    const authUrl = provider.getAuthorizationUrl(encodedState);

    return { authUrl };
  }
}
