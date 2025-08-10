import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScrapAddedEvent } from 'src/scrap/command/domain/event/scrap-added.event';
import { IncreaseScrapCountHandler } from './increase-scrap-count.handler';

@EventsHandler(ScrapAddedEvent)
export class IncreaseScrapCountListener implements IEventHandler<ScrapAddedEvent> {
  constructor(private readonly increaseScrapCountHandler: IncreaseScrapCountHandler) {}

  async handle(event: ScrapAddedEvent): Promise<void> {
    const { articleId } = event;

    await this.increaseScrapCountHandler.execute({ articleId });
  }
}
