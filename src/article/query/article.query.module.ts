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
import { ARTICLE_READER } from './organization/domain/article.reader';
import { ArticleReaderImpl } from './organization/infrastructure/article.reader.impl';
import { ArticleOrganizationViewController } from './organization/presentation/article.view.controller';
import { GetOrganizationArticleListUseCase } from './organization/application/article-list/get-article-list.use-case';
import { ArticleViewEntity } from './organization/infrastructure/article.view.entity';

const usecases = [
  GetArticleDetailUseCase,
  GetArticleListUseCase,
  GetArticleSearchUseCase,
  GetOrganizationArticleListUseCase,
];

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, ArticleViewEntity, MediaEntity])],
  providers: [
    ...usecases,
    {
      provide: ARTICLE_QUERY_REPOSITORY,
      useClass: ArticleQueryRepositoryImpl,
    },
    {
      provide: ARTICLE_READER,
      useClass: ArticleReaderImpl,
    },
  ],
  controllers: [ArticleQueryController, ArticleOrganizationViewController],
})
export class ArticleQueryModule {}
