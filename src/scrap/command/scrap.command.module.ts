import { Module } from '@nestjs/common';
import { ScrapCommandController } from './presentation/scrap.command.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from './infrastructure/scrap.entity';
import { DeleteScrapHandler } from './application/delete-scrap/delete-scrap.handler';
import { SCRAP_COMMAND_REPOSITORY } from './domain/scrap.command.repository';
import { ScrapCommandRepositoryImpl } from './infrastructure/scrap.command.repository.impl';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { AddScrapHandler } from './application/add-scrap/add-scrap.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ARTICLE_QUERY_REPOSITORY } from 'src/article/query/domain/repository/article.query.repository';
import { ArticleQueryRepositoryImpl } from 'src/article/query/infrastructure/article.query.repository.impl';
import { ArticleQueryModule } from 'src/article/query/article.query.module';

const usecases = [AddScrapHandler, DeleteScrapHandler];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, ArticleEntity]), ArticleQueryModule, CqrsModule],
  providers: [
    ...usecases,
    {
      provide: SCRAP_COMMAND_REPOSITORY,
      useClass: ScrapCommandRepositoryImpl,
    },
    {
      provide: ARTICLE_QUERY_REPOSITORY,
      useClass: ArticleQueryRepositoryImpl,
    },
  ],
  controllers: [ScrapCommandController],
  exports: [],
})
export class ScrapCommandModule {}
