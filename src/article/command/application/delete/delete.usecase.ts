import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleRepo: ArticleCommandRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.articleRepo.deleteById(id);
  }
}
