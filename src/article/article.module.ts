import { Module } from '@nestjs/common';
import { ARTICLE_REPOSITORY } from './domain/repository/article.repository';
import { ArticleRepositoryImpl } from './infrastructure/repository/article.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticleEntity } from './infrastructure/orm-entity/article.entity';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ArticleEntity, MediaEntity, TagEntity])],
  providers: [
    {
      provide: ARTICLE_REPOSITORY,
      useClass: ArticleRepositoryImpl,
    },
  ],
})
export class ArticleModule {}
