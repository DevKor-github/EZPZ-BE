import { ApiProperty } from '@nestjs/swagger';
import { ArticleModel } from './article.model';

export class ArticleDetailModel extends ArticleModel {
  @ApiProperty({
    example: '게시글 설명',
    description: '게시글의 상세 설명',
  })
  description: string;

  @ApiProperty({
    example: '고려대학교',
    description: '위치',
  })
  location: string;

  @ApiProperty({
    example: 'https://example.com/register',
    description: '등록 URL',
  })
  registrationUrl: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: '등록 시작 시간',
    required: false,
  })
  registrationStartAt?: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: '등록 종료 시간',
    required: false,
  })
  registrationEndAt?: string;

  @ApiProperty({
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: '이미지 경로 목록',
  })
  imagePaths: string[];
}
