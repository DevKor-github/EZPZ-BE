import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ArticleEntity } from './infrastructure/article.entity';
import { ArticleCommandController } from './presentation/article.command.controller';
import { CreateArticleUseCase } from './application/create-article/create-article.use-case';
import { DeleteArticleUseCase } from './application/delete-article/delete-article.use-case';
import { ARTICLE_COMMAND_REPOSITORY } from './domain/article.command.repository';
import { ArticleCommandRepositoryImpl } from './infrastructure/article.command.repository.impl';
import { TAG_REPOSITORY } from 'src/tag/domain/repository/tag.repository';
import { TagRepositoryImpl } from 'src/tag/infrastructure/repository/tag.repository.impl';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

const usecases = [CreateArticleUseCase, DeleteArticleUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, TagEntity])],
  providers: [
    ...usecases,
    {
      provide: ARTICLE_COMMAND_REPOSITORY,
      useClass: ArticleCommandRepositoryImpl,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: TagRepositoryImpl,
    },
  ],
  controllers: [ArticleCommandController],
})
export class ArticleCommandModule {}
