import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { Transactional } from '@mikro-orm/core';
import { Scrap } from '../../domain/scrap';
import { Identifier } from 'src/shared/core/domain/identifier';
import {
  ARTICLE_COMMAND_REPOSITORY,
  ArticleCommandRepository,
} from 'src/article/command/domain/article.command.repository';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { AddScrapCommand } from './add-scrap.command';
import { ScrapAddedEvent } from '../../domain/event/scrap-added.event';

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

  @Transactional()
  async execute(command: AddScrapCommand): Promise<void> {
    const { articleId, userId } = command;
    const now = new Date();

    await this.saveScrap(articleId, userId, now);
    await this.eventBus.publish(new ScrapAddedEvent(articleId, userId));
  }

  private async saveScrap(articleId: string, userId: string, now: Date): Promise<void> {
    const existingScrap = await this.scrapCommandRepository.existsByArticleIdAndUserId(articleId, userId);
    if (existingScrap) throw new ConflictException('이미 스크랩한 게시물 입니다.');
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
  }
}
