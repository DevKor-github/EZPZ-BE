import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteScrapCommand } from './delete-scrap.command';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import {
  ARTICLE_QUERY_REPOSITORY,
  ArticleQueryRepository,
} from 'src/article/query/domain/repository/article.query.repository';

@Injectable()
@CommandHandler(DeleteScrapCommand)
export class DeleteScrapHandler {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
    @Inject(ARTICLE_QUERY_REPOSITORY)
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async execute(command: DeleteScrapCommand) {
    const { articleId, userId } = command;

    const scrap = await this.scrapCommandRepository.findByArticleIdAndUserId(articleId, userId);
    if (!scrap) throw new CustomException(CustomExceptionCode.SCRAP_NOT_FOUND);
    const article = await this.articleQueryRepository.findById(articleId);
    if (!article) throw new CustomException(CustomExceptionCode.ARTICLE_NOT_FOUND);

    await this.scrapCommandRepository.deleteByArticleIdAndUserId(articleId, userId);

    scrap.delete(article.tags);

    const events = scrap.pullDomainEvents();
    await this.eventBus.publishAll(events);
  }
}
