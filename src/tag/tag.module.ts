import { Module } from '@nestjs/common';
import { TAG_REPOSITORY } from './domain/repository/tag.repository';
import { TagRepositoryImpl } from './infrastructure/repository/tag.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TagEntity } from './infrastructure/orm-entity/tag.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TagEntity, ArticleEntity])],
  providers: [
    {
      provide: TAG_REPOSITORY,
      useClass: TagRepositoryImpl,
    },
  ],
})
export class TagModule {}
