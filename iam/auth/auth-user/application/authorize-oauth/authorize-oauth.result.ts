import { IsUrl } from 'class-validator';

export class AuthorizeOAuthResult {
  @IsUrl()
  authUrl: string;
}
