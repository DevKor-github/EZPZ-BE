import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';

@Injectable()
export class DeleteArticle {
  constructor(@Inject(ARTICLE_REPOSITORY) private readonly repo: ArticleRepository) {}

  async delete(id: string): Promise<void> {
    await this.repo.deleteById(id);
  }
}
