import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapAddedEvent } from 'src/scrap/command/domain/event/scrap-added.event';
import { ScrapDeletedEvent } from 'src/scrap/command/domain/event/scrap-deleted.event';
import { AnalyticsService } from '../infrastructure/analytics.service';

@EventsHandler(ScrapAddedEvent)
export class ScrapAddedEventHandler implements IEventHandler<ScrapAddedEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: ScrapAddedEvent) {
    this.analyticsService.trackEvent(event.userId, 'Article Scrapped', {
      articleId: event.articleId,
    });
  }
}

@EventsHandler(ScrapDeletedEvent)
export class ScrapDeletedEventHandler implements IEventHandler<ScrapDeletedEvent> {
  constructor(private readonly analyticsService: AnalyticsService) {}

  handle(event: ScrapDeletedEvent) {
    this.analyticsService.trackEvent(event.userId, 'Article Unscrapped', {
      articleId: event.articleId,
    });
  }
}
