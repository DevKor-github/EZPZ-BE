import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResult {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
