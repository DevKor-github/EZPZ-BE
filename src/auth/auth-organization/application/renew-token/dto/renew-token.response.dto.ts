import { IsNotEmpty, IsString } from 'class-validator';

export class RenewTokenResponseDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
