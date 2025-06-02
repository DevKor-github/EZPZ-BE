import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { GetMyScrapRequestDto } from './dto/get-my-scrap.request.dto';
import { GetMyScrapResponseDto } from './dto/get-my-scrap.response.dto';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';

@Injectable()
export class GetMyScrapUseCase {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapRepository: ScrapRepository,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleRepository,
  ) {}

  async execute(getMyScrapRequestDto: GetMyScrapRequestDto): Promise<GetMyScrapResponseDto[]> {
    const { userId } = getMyScrapRequestDto;
    const scraps = await this.scrapRepository.findByUserId(userId);
    const articleIds = scraps.map((scrap) => scrap.articleId.value);
    const articles = await this.articleRepository.findByIds(articleIds);

    // 임시로직 -> 다른 방법이 있는 지 탐색 예정
    // join vs repostiory 두 개에서 각각 가져오기
    return articles.map((article) => {
      if (!article) throw new NotFoundException(`해당 게시글이 존재하지 않습니다.`);
      return {
        articleId: article.id.value,
        title: article.title,
        organization: article.organization,
        scrapCount: article.scrapCount,
        thumbnailPath: article?.mediaIds?.[0]?.value,
        tags: article.tags.map((tag) => tag.name),
      };
    });
  }
}
