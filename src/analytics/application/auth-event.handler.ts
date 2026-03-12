import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AnalyticsService } from '../infrastructure/analytics.service';
import { LoginSucceededEvent } from 'src/iam/auth/auth-user/domain/event/login-succeeded.event';
import { UserSignedUpEvent } from 'src/iam/auth/auth-user/domain/event/user-signed-up.event';

@EventsHandler(UserSignedUpEvent)
export class UserSignedUpEventHandler implements IEventHandler<UserSignedUpEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: UserSignedUpEvent) {
    this.analyticsService.trackEvent(event.userId.value, 'Signed Up', {
      email: event.email,
    });
  }
}

@EventsHandler(LoginSucceededEvent)
export class LoginSucceededEventHandler implements IEventHandler<LoginSucceededEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: LoginSucceededEvent) {
    this.analyticsService.trackEvent(event.userId.value, 'Logged In', {});
  }
}
