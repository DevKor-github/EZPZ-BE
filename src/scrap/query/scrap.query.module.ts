import { Module } from '@nestjs/common';
import { GetMyScrapUseCase } from './application/get-my-scrap/get-my-scrap.use-case';
import { CheckScrapUseCase } from './application/check-scrap/check-scrap.use-case';
import { GetScrapSearchUseCase } from './application/scrap-search/get-scrap-search.use-case';
import { ScrapQueryController } from './presentation/scrap.query.controller';
import { SCRAP_QUERY_REPOSITORY } from './domain/scrap.query.repository';
import { ScrapQueryRepositoryImpl } from './infrastructure/scrap.query.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapViewEntity } from './infrastructure/scrap.view.entity';
import { ScrapEntity } from '../command/infrastructure/scrap.entity';

const useCases = [GetMyScrapUseCase, CheckScrapUseCase, GetScrapSearchUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, ScrapViewEntity])],
  providers: [
    ...useCases,
    {
      provide: SCRAP_QUERY_REPOSITORY,
      useClass: ScrapQueryRepositoryImpl,
    },
  ],
  controllers: [ScrapQueryController],
  exports: [],
})
export class ScrapQueryModule {}
