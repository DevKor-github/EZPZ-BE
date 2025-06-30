import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_QUERY_REPOSITORY, ScrapQueryRepository } from '../../domain/scrap.query.repository';
import { GetMyScrapRequestDto } from './dto/get-my-scrap.request.dto';
import { ScrapModel } from '../../domain/scrap.model';

@Injectable()
export class GetMyScrapUseCase {
  constructor(
    @Inject(SCRAP_QUERY_REPOSITORY)
    private readonly scrapQueryRepository: ScrapQueryRepository,
  ) {}

  async execute(reqDto: GetMyScrapRequestDto): Promise<ScrapModel[]> {
    const { userId } = reqDto;
    const result = await this.scrapQueryRepository.findByUserId(userId);

    return result;
  }
}
