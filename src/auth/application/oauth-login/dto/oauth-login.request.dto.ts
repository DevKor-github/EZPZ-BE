import { IsNotEmpty, IsString } from 'class-validator';

export class OAuthLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
