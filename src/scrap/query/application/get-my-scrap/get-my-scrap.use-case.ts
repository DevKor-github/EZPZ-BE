import { Inject, Injectable } from '@nestjs/common';
import { SCRAP_QUERY_REPOSITORY, ScrapQueryRepository } from '../../domain/scrap.query.repository';
import { GetMyScrapQuery } from './dto/get-my-scrap.query';
import { ScrapModel } from '../../domain/scrap.model';

@Injectable()
export class GetMyScrapUseCase {
  constructor(
    @Inject(SCRAP_QUERY_REPOSITORY)
    private readonly scrapQueryRepository: ScrapQueryRepository,
  ) {}

  async execute(query: GetMyScrapQuery): Promise<ScrapModel[]> {
    const { userId, tags, isFinished, sortBy } = query;
    const result = await this.scrapQueryRepository.findByCriteria(userId, tags, isFinished, sortBy);

    return result;
  }
}
