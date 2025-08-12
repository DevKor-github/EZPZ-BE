import { Module } from '@nestjs/common';
import { ScrapCommandController } from './presentation/scrap.command.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from './infrastructure/scrap.entity';
import { DeleteScrapHandler } from './application/delete-scrap/delete-scrap.handler';
import { SCRAP_COMMAND_REPOSITORY } from './domain/scrap.command.repository';
import { ScrapCommandRepositoryImpl } from './infrastructure/scrap.command.repository.impl';
import { ArticleCommandModule } from 'src/article/command/article.command.module';
import { ARTICLE_COMMAND_REPOSITORY } from 'src/article/command/domain/article.command.repository';
import { ArticleCommandRepositoryImpl } from 'src/article/command/infrastructure/article.command.repository.impl';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';
import { AddScrapHandler } from './application/add-scrap/add-scrap.handler';
import { CqrsModule } from '@nestjs/cqrs';

const usecases = [AddScrapHandler, DeleteScrapHandler];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, ArticleEntity]), ArticleCommandModule, CqrsModule],
  providers: [
    ...usecases,
    {
      provide: SCRAP_COMMAND_REPOSITORY,
      useClass: ScrapCommandRepositoryImpl,
    },
    {
      provide: ARTICLE_COMMAND_REPOSITORY,
      useClass: ArticleCommandRepositoryImpl,
    },
  ],
  controllers: [ScrapCommandController],
  exports: [],
})
export class ScrapCommandModule {}
