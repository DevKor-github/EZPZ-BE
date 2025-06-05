import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { SCRAP_REPOSITORY, ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { DeleteScrapRequestDto } from './dto/delete-scrap.request.dto';

@Injectable()
export class DeleteScrapUseCase {
  constructor(
    @Inject(SCRAP_REPOSITORY)
    private readonly scrapRepository: ScrapRepository,
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async execute(deleteScrapRequestDto: DeleteScrapRequestDto) {
    const { articleId, userId } = deleteScrapRequestDto;

    await this.scrapRepository.deleteByArticleIdAndUserId(articleId, userId);
    await this.decreaseArticleScrapCount(articleId);
  }

  private async decreaseArticleScrapCount(articleId: string): Promise<void> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');

    article.decreaseScrapCount();
    await this.articleRepository.update(article);
  }
}
