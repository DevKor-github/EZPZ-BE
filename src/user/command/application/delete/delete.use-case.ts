import { Inject, Injectable } from '@nestjs/common';
import { DeleteMyInfoRequestDto } from './dto/delete.request.dto';
import { OAuthProviderFactory } from 'src/shared/core/infrastructure/oauth/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';

@Injectable()
export class DeleteMyInfoUseCase {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
    private readonly oAuthProviderFactory: OAuthProviderFactory,
  ) {}

  async execute(deleteMyInfoRequestDto: DeleteMyInfoRequestDto): Promise<void> {
    const { userId } = deleteMyInfoRequestDto;
    const oAuthProvider = this.oAuthProviderFactory.getProvider(OAuthProviderType.KAKAO);
    await oAuthProvider.unlinkAccount(userId);

    await this.userCommandRepository.deleteById(userId);
  }
}
