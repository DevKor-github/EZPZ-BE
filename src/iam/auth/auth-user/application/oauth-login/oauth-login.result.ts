import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthLoginResult {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  redirectUrl: string;
}
