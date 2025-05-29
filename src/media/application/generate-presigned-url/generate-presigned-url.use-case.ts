import { Injectable } from '@nestjs/common';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { S3Adapter } from 'src/media/infrastructure/util/s3.adapter';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { GeneratePresignedUrlRequestDto } from './dto/generate-presigned-url.request.dto';
import { Media } from 'src/media/domain/entity/media';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';
import { GeneratePresignedUrlResponseDto } from './dto/generate-presigned-url.response.dto';

@Injectable()
export class GeneratePresignedUrlUseCase {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: MediaRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(
    generatePresignedUrlRequestDto: GeneratePresignedUrlRequestDto,
  ): Promise<GeneratePresignedUrlResponseDto[]> {
    const { articleId, fileInfoList } = generatePresignedUrlRequestDto;
    const now = new Date();
    const results: GeneratePresignedUrlResponseDto[] = [];

    for (const fileInfo of fileInfoList) {
      const { fileName, mimeType, isThumbnail } = fileInfo;
      const mediaId = Identifier.create();
      const { imageUrl, presignedUrl } = await this.s3Adapter.upload(articleId, fileName, mimeType);

      const media = Media.create({
        id: mediaId,
        createdAt: now,
        updatedAt: now,
        isThumbnail: isThumbnail,
        mediaPath: imageUrl,
        articleId: Identifier.from(articleId),
      });

      await this.mediaRepository.save(media);
      results.push({ presignedUrl });
    }

    return results;
  }
  /*
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
  */
}
