import { Module } from '@nestjs/common';
import { MediaCommandController } from './presentation/media.command.controller';
import { MEDIA_COMMAND_REPOSITORY } from './domain/media.command.repository';
import { MediaCommandRepositoryImpl } from './infrastructure/media.command.repository.impl';
import { GeneratePresignedUrlUseCase } from './application/generate-presigned-url/generate-presigned-url.use-case';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MediaEntity } from './infrastructure/media.entity';
import { S3Adapter } from './infrastructure/util/s3.adpater';

const usecases = [GeneratePresignedUrlUseCase];

@Module({
  imports: [MikroOrmModule.forFeature([MediaEntity])],
  providers: [
    ...usecases,
    {
      provide: MEDIA_COMMAND_REPOSITORY,
      useClass: MediaCommandRepositoryImpl,
    },
    S3Adapter,
  ],
  controllers: [MediaCommandController],
})
export class MediaCommandModule {}
