import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';

export class AuthorizeOAuthCommand {
  @IsEnum(OAuthProviderType)
  @IsNotEmpty()
  oAuthProviderType: OAuthProviderType;

  @IsString()
  redirectUrl?: string;
}
