import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteScrapCommand } from './delete-scrap.command';

@Injectable()
@CommandHandler(DeleteScrapCommand)
export class DeleteScrapHandler {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
  ) {}

  async execute(command: DeleteScrapCommand) {
    const { articleId, userId } = command;

    const scrap = await this.scrapCommandRepository.findByArticleIdAndUserId(articleId, userId);

    await this.scrapCommandRepository.deleteByArticleIdAndUserId(articleId, userId);

    const events = scrap.pullDomainEvents();
    await this.eventBus.publishAll(events);
  }
}
