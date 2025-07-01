import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { DeleteArticleRequestDto } from 'src/article/application/delete-article/dto/delete-article.request.dto';

@Injectable()
export class DeleteArticleUseCase {
  constructor(@Inject(ARTICLE_REPOSITORY) private readonly repo: ArticleRepository) {}

  async execute(requestDto: DeleteArticleRequestDto): Promise<void> {
    const { id } = requestDto;
    await this.repo.deleteById(id);
  }
}
