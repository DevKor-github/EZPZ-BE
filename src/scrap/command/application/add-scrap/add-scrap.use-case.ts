import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SCRAP_COMMAND_REPOSITORY, ScrapCommandRepository } from '../../domain/scrap.command.repository';
import { Transactional } from '@mikro-orm/core';
import { AddScrapRequestDto } from './dto/add-scrap.request.dto';
import { Scrap } from '../../domain/scrap';
import { Identifier } from 'src/shared/core/domain/identifier';
import {
  ARTICLE_COMMAND_REPOSITORY,
  ArticleCommandRepository,
} from 'src/article/command/domain/article.command.repository';

@Injectable()
export class AddScrapUseCase {
  constructor(
    @Inject(SCRAP_COMMAND_REPOSITORY)
    private readonly scrapCommandRepository: ScrapCommandRepository,
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepository: ArticleCommandRepository,
  ) {}

  @Transactional()
  async execute(reqDto: AddScrapRequestDto): Promise<void> {
    const { articleId, userId } = reqDto;
    const now = new Date();

    await this.saveScrap(articleId, userId, now);
    await this.increaseArticleScrapCount(articleId);
  }

  private async saveScrap(articleId: string, userId: string, now: Date): Promise<void> {
    const existingScrap = await this.scrapCommandRepository.existsByArticleIdAndUserId(articleId, userId);
    if (existingScrap) throw new ConflictException('이미 스크랩한 게시물 입니다.');
    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물 입니다.');

    const scrap = Scrap.create({
      id: Identifier.create(),
      userId: Identifier.from(userId),
      articleId: Identifier.from(articleId),
      createdAt: now,
      updatedAt: now,
    });

    await this.scrapCommandRepository.save(scrap);
  }

  private async increaseArticleScrapCount(articleId: string): Promise<void> {
    const article = await this.articleCommandRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물입니다.');

    article.increaseScrapCount();
    await this.articleCommandRepository.update(article);
  }
}
