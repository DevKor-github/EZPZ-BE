import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthCreatedEvent } from 'src/auth/domain/event/auth-created.event';
import { AnalyticsService } from '../infrastructure/analytics.service';
import { LoginSucceededEvent } from 'src/auth/domain/event/login-succeeded.event';

@EventsHandler(AuthCreatedEvent, LoginSucceededEvent)
export class AuthEventsHandler implements IEventHandler<AuthCreatedEvent | LoginSucceededEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: AuthCreatedEvent | LoginSucceededEvent) {
    if (event instanceof AuthCreatedEvent) {
      this.analyticsService.trackEvent(event.userId.value, 'signup_success', {
        email: event.email,
        role: event.role,
      });
    }

    if (event instanceof LoginSucceededEvent) {
      this.analyticsService.trackEvent(event.userId.value, 'login_success');
    }
  }
}
