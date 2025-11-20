import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthCreatedEvent } from 'src/auth/auth-user/domain/event/auth-created.event';
import { AnalyticsService } from '../infrastructure/analytics.service';
import { LoginSucceededEvent } from 'src/auth/auth-user/domain/event/login-succeeded.event';

@EventsHandler(AuthCreatedEvent)
export class AuthCreatedEventHandler implements IEventHandler<AuthCreatedEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: AuthCreatedEvent) {
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
