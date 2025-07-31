import { ICommand } from '@nestjs/cqrs';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

export class OAuthLoginCommand implements ICommand {
  constructor(
    public readonly oAuthProviderType: OAuthProviderType,
    public readonly code: string,
  ) {}
}
