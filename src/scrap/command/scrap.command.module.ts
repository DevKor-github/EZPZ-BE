import { Module } from '@nestjs/common';
import { ScrapCommandController } from './presentation/scrap.command.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from './infrastructure/scrap.entity';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { AddScrapUseCase } from './application/add-scrap/add-scrap.use-case';
import { DeleteScrapUseCase } from './application/delete-scrap/delete-scrap.use-case';
import { SCRAP_COMMAND_REPOSITORY } from './domain/scrap.command.repository';
import { ScrapCommandRepositoryImpl } from './infrastructure/scrap.command.repository.impl';
import { ArticleModule } from 'src/article/article.module';

const usecases = [AddScrapUseCase, DeleteScrapUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, UserEntity, ArticleEntity]), ArticleModule],
  providers: [
    ...usecases,
    {
      provide: SCRAP_COMMAND_REPOSITORY,
      useClass: ScrapCommandRepositoryImpl,
    },
  ],
  controllers: [ScrapCommandController],
  exports: [],
})
export class ScrapCommandModule {}
