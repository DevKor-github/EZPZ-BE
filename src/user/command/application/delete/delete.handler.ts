import { Inject, Injectable } from '@nestjs/common';
import { OAuthProviderFactory } from 'src/auth/core/infrastructure/oauth/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/auth-user/domain/value-object/oauth-provider.enum';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMyInfoCommand } from './delete.command';

@Injectable()
@CommandHandler(DeleteMyInfoCommand)
export class DeleteMyInfoHandler implements ICommandHandler<DeleteMyInfoCommand> {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
    private readonly oAuthProviderFactory: OAuthProviderFactory,
  ) {}

  async execute(command: DeleteMyInfoCommand): Promise<void> {
    const { userId } = command;
    const oAuthProvider = this.oAuthProviderFactory.getProvider(OAuthProviderType.KAKAO);
    console.log(1);
    await oAuthProvider.unlinkAccount(userId);

    await this.userCommandRepository.deleteById(userId);
  }
}
