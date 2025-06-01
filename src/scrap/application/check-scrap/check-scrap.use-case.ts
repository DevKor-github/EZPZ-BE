import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ScrapRepository } from 'src/scrap/domain/repository/scrap.repository';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { CheckScrapRequestDto } from './dto/check-scrap.request.dto';
import { CheckScrapResponseDto } from './dto/check-scrap.response.dto';

@Injectable()
export class CheckScrapUseCase {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapRepository: ScrapRepository,
  ) {}

  async execute(checkScrapRequestDto: CheckScrapRequestDto): Promise<CheckScrapResponseDto> {
    const { articleId, userId } = checkScrapRequestDto;

    const isScrapped = await this.scrapRepository.existsByArticleIdAndUserId(articleId, userId);

    return { isScrapped };
  }
}
