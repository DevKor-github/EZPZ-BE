import { Injectable } from '@nestjs/common';
import { GeneratePresignedUrlRequestDto } from './dto/generate-presigned-url.request.dto';
import { GeneratePresignedUrlResponseDto, PresignedUrlInfo } from './dto/generate-presigned-url.response.dto';
import { S3Adapter } from '../../infrastructure/util/s3.adpater';

@Injectable()
export class GeneratePresignedUrlUseCase {
  constructor(private readonly s3Adapter: S3Adapter) {}

  async execute(
    generatePresignedUrlRequestDto: GeneratePresignedUrlRequestDto,
  ): Promise<GeneratePresignedUrlResponseDto> {
    const { articleId, thumbnailInfo, fileInfoList } = generatePresignedUrlRequestDto;
    const presignedUrls: PresignedUrlInfo[] = [];

    let thumbnailPresignedUrl: PresignedUrlInfo | undefined;

    if (thumbnailInfo)
      thumbnailPresignedUrl = await this.s3Adapter.upload(articleId, thumbnailInfo.fileName, thumbnailInfo.mimeType);

    for (let i = 0; i < fileInfoList.length; i++) {
      const fileInfo = fileInfoList[i];

      presignedUrls.push(await this.s3Adapter.upload(articleId, fileInfo.fileName, fileInfo.mimeType));
    }

    return { thumbnailPresignedUrl, presignedUrls };
  }
}
