import { Module } from '@nestjs/common';
import { GetMyScrapUseCase } from './application/get-my-scrap/get-my-scrap.use-case';
import { CheckScrapUseCase } from './application/check-scrap/check-scrap.use-case';
import { ScrapQueryController } from './presentation/scrap.query.controller';
import { SCRAP_QUERY_REPOSITORY } from './domain/scrap.query.repository';
import { ScrapQueryRepositoryImpl } from './infrastructure/scrap.query.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from '../command/infrastructure/scrap.entity';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { UserEntity } from 'src/user/command/infrastructure/user.entity';

const useCases = [GetMyScrapUseCase, CheckScrapUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, UserEntity, ArticleEntity])],
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
