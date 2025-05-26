import { IsUrl } from 'class-validator';

export class AuthorizeOAuthResponseDto {
  @IsUrl()
  authUrl: string;
}
