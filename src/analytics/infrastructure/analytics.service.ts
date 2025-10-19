import { track } from '@amplitude/analytics-node';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  trackEvent(userId: string, eventType: string, eventProperties?: Record<string, any>) {
    try {
      track({
        user_id: userId,
        event_type: eventType,
        event_properties: eventProperties,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.logger.error(`Amplitude tracking failed ${e.message}`);
      }
    }
  }
}
