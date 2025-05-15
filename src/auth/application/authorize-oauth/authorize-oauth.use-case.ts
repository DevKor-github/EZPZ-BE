import { Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/auth/infrastructure/factory/oauth-provider.factory';
import { AuthorizeOAuthRequestDto } from './dto/authorize-oauth.request.dto';
import { AuthorizeOAuthResponseDto } from './dto/authorize-oauth.response.dto';

@Injectable()
export class AuthorizeOAuthUseCase {
  constructor(private readonly oAuthProviderFactory: OAuthProviderFactory) {}

  execute(requestDto: AuthorizeOAuthRequestDto): AuthorizeOAuthResponseDto {
    const { oAuthProviderType } = requestDto;
    const provider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    const authUrl = provider.getAuthorizationUrl();

    return { authUrl };
  }
}
