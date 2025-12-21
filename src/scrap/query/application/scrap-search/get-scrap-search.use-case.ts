import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_QUERY_REPOSITORY, ScrapQueryRepository } from '../../domain/scrap.query.repository';
import { ScrapModel } from '../../domain/scrap.model';
import { GetScrapSearchRequestDto } from './dto/get-scrap-search.request.dto';

@Injectable()
export class GetScrapSearchUseCase {
  constructor(
    @Inject(SCRAP_QUERY_REPOSITORY)
    private readonly scrapQueryRepository: ScrapQueryRepository,
  ) {}

  async execute(userId: string, reqDto: GetScrapSearchRequestDto): Promise<ScrapModel[]> {
    const { keyword } = reqDto;
    return await this.scrapQueryRepository.searchByKeyword(userId, keyword);
  }
}
