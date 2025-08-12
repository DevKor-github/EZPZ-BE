import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { DecreaseScrapCountCommand } from './decrease-scrap-count.command';

@Injectable()
export class DecreaseScrapCountHandler {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(command: DecreaseScrapCountCommand): Promise<void> {
    const { articleId } = command;

    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물입니다.');

    article.decreaseScrapCount();
    await this.articleCommandRepository.update(article);
  }
}
