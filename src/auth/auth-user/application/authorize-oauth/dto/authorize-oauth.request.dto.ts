import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OAuthProviderType } from 'src/auth/auth-user/domain/value-object/oauth-provider.enum';

export class AuthorizeOAuthRequestDto {
  @IsEnum(OAuthProviderType)
  @IsNotEmpty()
  oAuthProviderType: OAuthProviderType;

  @IsString()
  redirectUrl?: string;
}
