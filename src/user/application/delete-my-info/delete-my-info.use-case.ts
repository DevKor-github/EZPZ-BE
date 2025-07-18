import { Inject, Injectable } from '@nestjs/common';
import { DeleteMyInfoRequestDto } from './dto/delete-my-info.request.dto';
import { USER_REPOSITORY, UserRepository } from 'src/user/domain/repository/user.repository';
import { OAuthProviderFactory } from 'src/shared/core/infrastructure/oauth/oauth-provider.factory';
import { OAuthProviderType } from 'src/auth/domain/value-object/oauth-provider.enum';

@Injectable()
export class DeleteMyInfoUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly oAuthProviderFactory: OAuthProviderFactory,
  ) {}

  async execute(deleteMyInfoRequestDto: DeleteMyInfoRequestDto): Promise<void> {
    const { userId } = deleteMyInfoRequestDto;
    const oAuthProvider = this.oAuthProviderFactory.getProvider(OAuthProviderType.KAKAO);
    await oAuthProvider.unlinkAccount(userId);

    await this.userRepository.deleteById(userId);
  }
}
