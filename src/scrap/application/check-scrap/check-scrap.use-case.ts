import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_REPOSITORY, ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { CheckScrapRequestDto } from './dto/check-scrap.request.dto';
import { CheckScrapResponseDto } from './dto/check-scrap.response.dto';

@Injectable()
export class CheckScrapUseCase {
  constructor(
    @Inject(SCRAP_REPOSITORY)
    private readonly scrapRepository: ScrapRepository,
  ) {}

  async execute(checkScrapRequestDto: CheckScrapRequestDto): Promise<CheckScrapResponseDto> {
    const { articleId, userId } = checkScrapRequestDto;

    const isScrapped = await this.scrapRepository.existsByArticleIdAndUserId(articleId, userId);

    return { isScrapped };
  }
}
