import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeOAuthRequestDto {
  @IsString()
  @IsNotEmpty()
  providerName: string;
}
