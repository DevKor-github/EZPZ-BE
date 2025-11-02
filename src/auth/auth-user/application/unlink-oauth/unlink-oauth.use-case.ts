import { Inject, Injectable } from '@nestjs/common';
import { AUTH_USER_REPOSITORY, AuthUserRepository } from '../../domain/auth-user.repository';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { UnlinkOAuthCommand } from './unlink-oauth.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { OAuthProviderFactory } from 'src/auth/core/infrastructure/oauth/oauth-provider.factory';

@Injectable()
@CommandHandler(UnlinkOAuthCommand)
export class UnlinkOAuthUseCase {
  constructor(
    @Inject(AUTH_USER_REPOSITORY)
    private readonly authUserRepository: AuthUserRepository,
    private readonly oAuthProviderFactory: OAuthProviderFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UnlinkOAuthCommand) {
    const { userId, oAuthProviderType } = command;

    const authUser = await this.authUserRepository.findByUserId(userId);
    if (!authUser) throw new CustomException(CustomExceptionCode.AUTH_USER_NOT_FOUND);

    const oAuthProvider = this.oAuthProviderFactory.getProvider(oAuthProviderType);
    await oAuthProvider.unlinkAccount(authUser.oauthId);

    authUser.delete();
    await this.authUserRepository.deleteById(authUser.id.value);

    this.eventBus.publishAll(authUser.pullDomainEvents());
  }
}
