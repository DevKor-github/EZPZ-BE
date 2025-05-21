import { Injectable } from '@nestjs/common';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { S3Adapter } from 'src/media/infrastructure/util/s3.adapter';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { UploadRequestDto } from './dto/upload.request.dto';
import { Media } from 'src/media/domain/entity/media';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';

@Injectable()
export class UploadUseCase {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: MediaRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(uploadRequestDto: UploadRequestDto, files: Express.Multer.File[]): Promise<void> {
    const { articleId, isThumbnail } = uploadRequestDto;
    const now = new Date();

    await Promise.all(
      files.map(async (file) => {
        const mediaPath = await this.s3Adapter.upload(file, articleId);
        const media = Media.create({
          id: Identifier.create(),
          createdAt: now,
          updatedAt: now,
          isThumbnail: isThumbnail,
          mediaPath: mediaPath,
          articleId: Identifier.from(articleId),
        });

        await this.mediaRepository.save(media);
      }),
    );
  }
}
