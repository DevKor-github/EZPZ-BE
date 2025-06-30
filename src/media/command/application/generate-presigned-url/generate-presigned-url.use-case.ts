import { Inject, Injectable } from '@nestjs/common';
import { MEDIA_COMMAND_REPOSITORY, MediaCommandRepository } from '../../domain/media.command.repository';
import { GeneratePresignedUrlRequestDto } from './dto/generate-presigned-url.request.dto';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { Media } from '../../domain/media';
import { GeneratePresignedUrlResponseDto } from './dto/generate-presigned-url.response.dto';
import { S3Adapter } from '../../infrastructure/util/s3.adpater';

@Injectable()
export class GeneratePresignedUrlUseCase {
  constructor(
    @Inject(MEDIA_COMMAND_REPOSITORY)
    private readonly mediaCommandRepository: MediaCommandRepository,
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

    await this.mediaCommandRepository.saveAll(mediaList);

    return presignedUrls;
  }
}
