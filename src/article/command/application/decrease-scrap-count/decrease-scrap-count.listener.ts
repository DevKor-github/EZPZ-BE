import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapDeletedEvent } from 'src/scrap/command/domain/event/scrap-deleted.event';
import { DecreaseScrapCountHandler } from './decrease-scrap-count.handler';

@EventsHandler(ScrapDeletedEvent)
export class DecreaseScrapCountListener implements IEventHandler<ScrapDeletedEvent> {
  constructor(private readonly decreaseScrapCountHandler: DecreaseScrapCountHandler) {}

  async handle(event: ScrapDeletedEvent) {
    const { articleId } = event;

    await this.decreaseScrapCountHandler.execute({ articleId });
  }
}
