import { IsNotEmpty, IsString } from 'class-validator';

export class RenewTokenResult {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
