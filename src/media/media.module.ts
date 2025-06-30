import { Module } from '@nestjs/common';
import { MEDIA_REPOSITORY } from './domain/repository/media.repository';
import { MediaRepositoryImpl } from './infrastructure/repository/media.repository.impl';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MediaEntity } from './infrastructure/orm-entity/media.entity';
import { MulterModule } from '@nestjs/platform-express';
import { S3Adapter } from './infrastructure/util/s3.adapter';
import { GeneratePresignedUrlUseCase } from './application/generate-presigned-url/generate-presigned-url.use-case';
import { MediaController } from './presentation/media.controller';
import { DeleteFileUseCase } from './application/delete-file/delete-file.use-case';
import { ArticleEntity } from 'src/article/command/infrastructure/article.entity';

const useCases = [GeneratePresignedUrlUseCase, DeleteFileUseCase];

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
