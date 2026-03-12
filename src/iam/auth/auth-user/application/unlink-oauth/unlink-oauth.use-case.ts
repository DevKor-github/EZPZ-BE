import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UnlinkOAuthCommand } from './unlink-oauth.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { AUTH_USER_STORE, AuthUserStore } from '../../domain/auth-user.repository';
import { OAuthProviderFactory } from 'src/iam/auth/auth-core/infrastructure/oauth/oauth-provider.factory';

@Injectable()
@CommandHandler(UnlinkOAuthCommand)
export class UnlinkOAuthUseCase {
  constructor(
    @Inject(AUTH_USER_STORE)
    private readonly authUserStore: AuthUserStore,
    private readonly oAuthProviderFactory: OAuthProviderFactory,
  ) {}

  async execute(command: UnlinkOAuthCommand) {
    const { userId, oAuthProviderType } = command;

    const authUser = await this.authUserStore.findByUserId(userId);
    if (!authUser) throw new CustomException(CustomExceptionCode.AUTH_USER_NOT_FOUND);

    const oAuthProvider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    await oAuthProvider.unlinkAccount(authUser.oauthId);

    authUser.delete();
    await this.authUserStore.deleteById(authUser.id.value);
  }
}
