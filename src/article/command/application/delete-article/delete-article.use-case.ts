import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { DeleteArticleCommand } from './delete-article.comand';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleRepo: ArticleCommandRepository,
  ) {}

  async execute(command: DeleteArticleCommand): Promise<void> {
    await this.articleRepo.deleteById(command.id);
  }
}
