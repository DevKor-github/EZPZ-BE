import { Module } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from './domain/repository/article.repository';
import { ArticleRepositoryImpl } from './infrastructure/repository/article.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from './infrastructure/orm-entity/article.entity';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { ArticleController } from './presentation/article.controller';
import { CreateArticleUseCase } from './application/create-article/create-article.use-case';
import { DeleteArticleUseCase } from './application/delete-article/delete-article.use-case';
import { GetArticleDetailUseCase } from './application/get-article-detail/get-article-detail.use-case';
import { GetArticleListUseCase } from './application/get-article-list/get-article-list.use-case';
import { MediaModule } from 'src/media/media.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, MediaEntity, TagEntity]), MediaModule, TagModule],
  controllers: [ArticleController],
  providers: [
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleRepositoryImpl,
    },
    CreateArticleUseCase,
    DeleteArticleUseCase,
    GetArticleDetailUseCase,
    GetArticleListUseCase,
  ],
  exports: [ARTICLE_REPOSITORY],
})
export class ArticleModule {}
