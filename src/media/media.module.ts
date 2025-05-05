import { Module } from '@nestjs/common';
import { MEDIA_REPOSITORY } from './domain/repository/media.repository';
import { MediaRepositoryImpl } from './infrastructure/repository/media.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MediaEntity } from './infrastructure/orm-entity/media.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature([MediaEntity, ArticleEntity])],
  providers: [
    {
      provide: MEDIA_REPOSITORY,
      useClass: MediaRepositoryImpl,
    },
  ],
})
export class MediaModule {}
