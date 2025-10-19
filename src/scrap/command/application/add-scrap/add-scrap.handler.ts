import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { Scrap } from '../../domain/scrap';
import { Identifier } from 'src/shared/core/domain/identifier';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AddScrapCommand } from './add-scrap.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import {
  ARTICLE_QUERY_REPOSITORY,
  ArticleQueryRepository,
} from 'src/article/query/domain/repository/article.query.repository';
import { ScrapAddedEvent } from '../../domain/event/scrap-added.event';

@Injectable()
@CommandHandler(AddScrapCommand)
export class AddScrapHandler {
  constructor(
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
    private readonly eventBus: EventBus,
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(command: AddScrapCommand): Promise<void> {
    const { articleId, userId } = command;
    const now = new Date();

    const existingScrap = await this.scrapCommandRepository.findByArticleIdAndUserId(articleId, userId);
    if (existingScrap) throw new CustomException(CustomExceptionCode.SCRAP_ALREADY_EXISTS);
    const article = await this.articleQueryRepository.findById(articleId);
    if (!article) throw new CustomException(CustomExceptionCode.ARTICLE_NOT_FOUND);

    const scrap = Scrap.create({
      id: Identifier.create(),
      userId: Identifier.from(userId),
      articleId: Identifier.from(articleId),
      createdAt: now,
      updatedAt: now,
    });

    await this.scrapCommandRepository.save(scrap);

    this.eventBus.publish(new ScrapAddedEvent(scrap.userId.value, scrap.articleId.value, article.tags));
  }
}
