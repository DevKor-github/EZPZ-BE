import { EventsHandler } from '@nestjs/cqrs';
import { UserDeletedEvent } from 'src/user/command/domain/event/user-deleted.event';
import { UnlinkOAuthUseCase } from './unlink-oauth.use-case';
import { OAuthProviderType } from '../../domain/value-object/oauth-provider.enum';
import { Transactional } from '@mikro-orm/core';

@EventsHandler(UserDeletedEvent)
export class UnlinkOAuthListener {
  constructor(private readonly unlinkOAuthUseCase: UnlinkOAuthUseCase) {}

  @Transactional()
  async handle(event: UserDeletedEvent): Promise<void> {
    const { userId } = event;
    await this.unlinkOAuthUseCase.execute({ userId, oAuthProviderType: OAuthProviderType.KAKAO });
  }
}
