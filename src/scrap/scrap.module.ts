import { Module } from '@nestjs/common';
import { ScrapController } from './presentation/scrap.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from 'src/scrap/infrastructure/orm-entity/scrap.entity';
import { SCRAP_REPOSITORY } from './domain/repository/scrap.repository';
import { ScrapRepositoryImpl } from './infrastructure/repository/scrap.repository.impl';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { GetMyScrapUseCase } from './application/get-my-scrap/get-my-scrap.use-case';
import { ARTICLE_REPOSITORY } from 'src/article/domain/repository/article.repository';
import { ArticleRepositoryImpl } from 'src/article/infrastructure/repository/article.repository.impl';
import { AddScrapUseCase } from './application/add-scrap/add-scrap.use-case';
import { CheckScrapUseCase } from './application/check-scrap/check-scrap.use-case';
import { DeleteScrapUseCase } from './application/delete-scrap/delete-scrap.use-case';

const useCases = [GetMyScrapUseCase, AddScrapUseCase, CheckScrapUseCase, DeleteScrapUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, UserEntity, ArticleEntity])],
  providers: [
    ...useCases,
    {
      provide: SCRAP_REPOSITORY,
      useClass: ScrapRepositoryImpl,
    },
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleRepositoryImpl,
    },
  ],
  controllers: [ScrapController],
})
export class ScrapModule {}
