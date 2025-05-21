import { Module } from '@nestjs/common';
import { MEDIA_REPOSITORY } from './domain/repository/media.repository';
import { MediaRepositoryImpl } from './infrastructure/repository/media.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MediaEntity } from './infrastructure/orm-entity/media.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Adapter } from './infrastructure/util/s3.adapter';
import { UploadUseCase } from './application/upload/upload.use-case';
import { MediaController } from './presentation/media.controller';

const useCases = [UploadUseCase];

@Module({
  imports: [MulterModule.register({}), MikroOrmModule.forFeature([MediaEntity, ArticleEntity])],
  providers: [
    ...useCases,
    {
      provide: MEDIA_REPOSITORY,
      useClass: MediaRepositoryImpl,
    },
    S3Adapter,
  ],
  exports: [...useCases, MEDIA_REPOSITORY],
  controllers: [MediaController],
})
export class MediaModule {}
