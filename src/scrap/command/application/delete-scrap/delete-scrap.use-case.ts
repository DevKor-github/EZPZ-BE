import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { DeleteScrapRequestDto } from './dto/delete-scrap.request.dto';
import {
  ARTICLE_COMMAND_REPOSITORY,
  ArticleCommandRepository,
} from 'src/article/command/domain/article.command.repository';
@Injectable()
export class DeleteScrapUseCase {
  constructor(
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  async execute(reqDto: DeleteScrapRequestDto) {
    const { articleId, userId } = reqDto;

    await this.scrapCommandRepository.deleteByArticleIdAndUserId(articleId, userId);
    await this.decreaseArticleScrapCount(articleId);
  }

  private async decreaseArticleScrapCount(articleId: string): Promise<void> {
    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('해당 게시글이 존재하지 않습니다.');

    article.decreaseScrapCount();
    await this.articleCommandRepository.update(article);
  }
}
