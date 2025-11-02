import { Module } from '@nestjs/common';
import { GetArticleDetailUseCase } from './application/article-detail/get-article-detail.use-case';
import { GetArticleListUseCase } from './application/article-list/get-article-list.use-case';
import { GetArticleSearchUseCase } from './application/article-search/get-article-search.use-case';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from '../command/infrastructure/article.entity';
import { ArticleQueryController } from './presentation/article.query.controller';
import { ARTICLE_QUERY_REPOSITORY } from './domain/repository/article.query.repository';
import { ArticleQueryRepositoryImpl } from './infrastructure/article.query.repository.impl';
import { MediaEntity } from 'src/media/command/infrastructure/media.entity';

const usecases = [GetArticleDetailUseCase, GetArticleListUseCase, GetArticleSearchUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, MediaEntity])],
  providers: [
    ...usecases,
    {
      provide: ARTICLE_QUERY_REPOSITORY,
      useClass: ArticleQueryRepositoryImpl,
    },
  ],
  controllers: [ArticleQueryController],
})
export class ArticleQueryModule {}
