import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_QUERY_REPOSITORY, ScrapQueryRepository } from '../../domain/scrap.query.repository';
import { CheckScrapQuery } from './dto/check-scrap.query';
import { CheckScrapResponseDto } from './dto/check-scrap.response.dto';

@Injectable()
export class CheckScrapUseCase {
  constructor(
    @Inject(SCRAP_QUERY_REPOSITORY)
    private readonly scrapQueryRepository: ScrapQueryRepository,
  ) {}

  async execute(query: CheckScrapQuery): Promise<CheckScrapResponseDto> {
    const { articleId, userId } = query;

    const isScrapped = await this.scrapQueryRepository.existsByArticleIdAndUserId(articleId, userId);

    return { isScrapped };
  }
}
