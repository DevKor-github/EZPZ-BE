import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';

@Injectable()
export class IncreaseScrapCountHandler {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(articleId: string): Promise<void> {
    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물입니다.');

    article.increaseScrapCount();
    await this.articleCommandRepository.update(article);
  }
}
