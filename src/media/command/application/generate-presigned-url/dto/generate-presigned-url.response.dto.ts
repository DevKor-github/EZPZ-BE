import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratePresignedUrlResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Media ID',
    example: '1231312124',
  })
  mediaId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Presigned URL',
    example: 'https://example-bucket.s3.amazonaws.com/path/to/file?AWSAccessKeyId=...&Signature=...',
  })
  presignedUrl: string;
}
