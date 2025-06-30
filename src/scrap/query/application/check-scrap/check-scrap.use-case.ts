import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_QUERY_REPOSITORY, ScrapQueryRepository } from '../../domain/scrap.query.repository';
import { CheckScrapRequestDto } from './dto/check-scrap.request.dto';
import { CheckScrapResponseDto } from './dto/check-scrap.response.dto';

@Injectable()
export class CheckScrapUseCase {
  constructor(
    @Inject(SCRAP_QUERY_REPOSITORY)
    private readonly scrapQueryRepository: ScrapQueryRepository,
  ) {}

  async execute(reqDto: CheckScrapRequestDto): Promise<CheckScrapResponseDto> {
    const { articleId, userId } = reqDto;

    const isScrapped = await this.scrapQueryRepository.existsByArticleIdAndUserId(articleId, userId);

    return { isScrapped };
  }
}
