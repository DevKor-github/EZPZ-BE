import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { Scrap } from '../../domain/scrap';
import { Identifier } from 'src/shared/core/domain/identifier';
import {
  ARTICLE_COMMAND_REPOSITORY,
  ArticleCommandRepository,
} from 'src/article/command/domain/article.command.repository';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AddScrapCommand } from './add-scrap.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

@Injectable()
@CommandHandler(AddScrapCommand)
export class AddScrapHandler {
  constructor(
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
    private readonly eventBus: EventBus,
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(command: AddScrapCommand): Promise<void> {
    const { articleId, userId } = command;
    const now = new Date();

    const existingScrap = await this.scrapCommandRepository.findByArticleIdAndUserId(articleId, userId);
    if (existingScrap) throw new CustomException(CustomExceptionCode.SCRAP_ALREADY_EXISTS);
    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물 입니다.');

    const scrap = Scrap.create({
      id: Identifier.create(),
      userId: Identifier.from(userId),
      articleId: Identifier.from(articleId),
      createdAt: now,
      updatedAt: now,
    });

    await this.scrapCommandRepository.save(scrap);

    const events = scrap.pullDomainEvents();

    for (const event of events) {
      await this.eventBus.publish(event);
    }
  }
}
