import { EventsHandler } from '@nestjs/cqrs';
import { UnlinkOAuthUseCase } from './unlink-oauth.use-case';
import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';
import { Transactional } from '@mikro-orm/core';
import { UserDeletedEvent } from 'iam/user/domain/event/user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class UnlinkOAuthListener {
  constructor(private readonly unlinkOAuthUseCase: UnlinkOAuthUseCase) {}

  @Transactional()
  async handle(event: UserDeletedEvent): Promise<void> {
    const { userId } = event;
    await this.unlinkOAuthUseCase.execute({ userId, oAuthProviderType: OAuthProviderType.KAKAO });
  }
}
