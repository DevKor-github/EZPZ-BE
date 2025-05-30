import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

export class OAuthLoginRequestDto {
  @IsEnum(OAuthProviderType)
  @IsNotEmpty()
  oAuthProviderType: OAuthProviderType;

  @IsString()
  @IsNotEmpty()
  code: string;
}
