import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ArticleEntity } from './infrastructure/article.entity';
import { ArticleCommandController } from './presentation/article.command.controller';
import { CreateArticleUseCase } from './application/create-article/create-article.use-case';
import { UpdateArticleUseCase } from './application/update-article/update-article.use-case';
import { DeleteArticleUseCase } from './application/delete-article/delete-article.use-case';
import { ARTICLE_COMMAND_REPOSITORY } from './domain/article.command.repository';
import { ArticleCommandRepositoryImpl } from './infrastructure/article.command.repository.impl';
import { TAG_REPOSITORY } from 'src/tag/domain/repository/tag.repository';
import { TagRepositoryImpl } from 'src/tag/infrastructure/repository/tag.repository.impl';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { MEDIA_COMMAND_REPOSITORY } from 'src/media/command/domain/media.command.repository';
import { MediaCommandRepositoryImpl } from 'src/media/command/infrastructure/media.command.repository.impl';
import { MediaEntity } from 'src/media/command/infrastructure/media.entity';
import { IncreaseScrapCountListener } from './application/increase-scrap-count/increase-scrap-count.listener';
import { IncreaseScrapCountHandler } from './application/increase-scrap-count/increase-scrap-count.handler';

const usecases = [CreateArticleUseCase, UpdateArticleUseCase, DeleteArticleUseCase, IncreaseScrapCountHandler];
const listeners = [IncreaseScrapCountListener];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, TagEntity, MediaEntity])],
  providers: [
    ...usecases,
    ...listeners,
    {
      provide: ARTICLE_COMMAND_REPOSITORY,
      useClass: ArticleCommandRepositoryImpl,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: TagRepositoryImpl,
    },
    {
      provide: MEDIA_COMMAND_REPOSITORY,
      useClass: MediaCommandRepositoryImpl,
    },
  ],
  controllers: [ArticleCommandController],
})
export class ArticleCommandModule {}
