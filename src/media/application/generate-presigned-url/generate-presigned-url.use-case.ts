import { Inject, Injectable } from '@nestjs/common';
import { MEDIA_REPOSITORY, MediaRepository } from 'src/media/domain/repository/media.repository';
import { S3Adapter } from 'src/media/infrastructure/util/s3.adapter';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { GeneratePresignedUrlRequestDto } from './dto/generate-presigned-url.request.dto';
import { Media } from 'src/media/domain/entity/media';
import { GeneratePresignedUrlResponseDto } from './dto/generate-presigned-url.response.dto';

@Injectable()
export class GeneratePresignedUrlUseCase {
  constructor(
    @Inject(MEDIA_REPOSITORY)
    private readonly mediaRepository: MediaRepository,
    private readonly s3Adapter: S3Adapter,
  ) {}

  async execute(
    generatePresignedUrlRequestDto: GeneratePresignedUrlRequestDto,
  ): Promise<GeneratePresignedUrlResponseDto[]> {
    const { articleId, fileInfoList } = generatePresignedUrlRequestDto;
    const now = new Date();
    const presignedUrls: GeneratePresignedUrlResponseDto[] = [];
    const mediaList: Media[] = [];

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

      presignedUrls.push({ presignedUrl });
      mediaList.push(media);
    }

    await this.mediaRepository.saveAll(mediaList);

    return presignedUrls;
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
