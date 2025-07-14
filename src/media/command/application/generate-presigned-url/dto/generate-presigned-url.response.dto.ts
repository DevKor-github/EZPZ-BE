import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PresignedUrlInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Presigned URL',
    example: 'https://example-bucket.s3.amazonaws.com/path/to/file?AWSAccessKeyId=...&Signature=...',
  })
  presignedUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Image URL',
    example: 'https://aaaaa.com/path/to/file.jpg',
  })
  imageUrl: string;
}

export class GeneratePresignedUrlResponseDto {
  @ApiProperty({
    description: 'Article ID',
    type: PresignedUrlInfo,
  })
  thumbnailPresignedUrl?: PresignedUrlInfo;

  @ApiProperty({
    description: 'List of presigned URLs',
    type: [PresignedUrlInfo],
  })
  presignedUrls: PresignedUrlInfo[];
}
