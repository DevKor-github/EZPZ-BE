import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { DeleteScrapRequestDto } from './dto/delete-scrap.request.dto';
@Injectable()
export class DeleteScrapUseCase {
  constructor(
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapRepository: ScrapCommandRepository,
    @Inject(ARTICLE_REPOSITORY)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async execute(reqDto: DeleteScrapRequestDto) {
    const { articleId, userId } = reqDto;

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
