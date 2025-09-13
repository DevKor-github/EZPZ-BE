import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { IncreaseScrapCountCommand } from './increase-srcrap-count.command';

@Injectable()
export class IncreaseScrapCountHandler {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(command: IncreaseScrapCountCommand): Promise<void> {
    const { articleId } = command;

    const article = await this.articleCommandRepository.findById(articleId);

    article.increaseScrapCount();
    await this.articleCommandRepository.update(article);
  }
}
