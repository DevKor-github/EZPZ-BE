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

    for (let i = 0; i < fileInfoList.length; i++) {
      const fileInfo = fileInfoList[i];
      const { fileName, mimeType } = fileInfo;
      const mediaId = Identifier.create();
      const { imageUrl, presignedUrl } = await this.s3Adapter.upload(articleId, fileName, mimeType);

      const media = Media.create({
        id: mediaId,
        createdAt: now,
        updatedAt: now,
        order: i, // 순서 부여
        mediaPath: imageUrl,
        articleId: Identifier.from(articleId),
      });

      mediaList.push(media);
      presignedUrls.push({
        mediaId: mediaId.value,
        presignedUrl,
      });
    }

    await this.mediaCommandRepository.saveAll(mediaList);

    return presignedUrls;
  }
}
