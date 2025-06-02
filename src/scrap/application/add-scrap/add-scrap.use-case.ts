import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { AddScrapRequestDto } from './dto/add-scrap.request.dto';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { Scrap } from 'src/scrap/domain/entity/scrap';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { Transactional } from '@mikro-orm/core';

@Injectable()
export class AddScrapUseCase {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapRepository: ScrapRepository,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}

  @Transactional()
  async execute(addScrapRequestDto: AddScrapRequestDto): Promise<void> {
    const { articleId, userId } = addScrapRequestDto;
    const now = new Date();

    await this.saveScrap(articleId, userId, now);
    await this.increaseArticleScrapCount(articleId);
  }

  private async saveScrap(articleId: string, userId: string, now: Date): Promise<void> {
    const existingScrap = await this.scrapRepository.existsByArticleIdAndUserId(articleId, userId);
    if (existingScrap) throw new ConflictException('이미 스크랩한 게시물 입니다.');

    const scrap = Scrap.create({
      id: Identifier.create(),
      userId: Identifier.from(userId),
      articleId: Identifier.from(articleId),
      createdAt: now,
      updatedAt: now,
    });

    await this.scrapRepository.save(scrap);
  }

  private async increaseArticleScrapCount(articleId: string): Promise<void> {
    const article = await this.articleRepository.findById(articleId);
    if (!article) throw new NotFoundException('존재하지 않는 게시물입니다.');

    article.increaseScrapCount();
    await this.articleRepository.update(article);
  }
}
