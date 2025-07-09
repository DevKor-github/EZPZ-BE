import { ApiProperty } from '@nestjs/swagger';

export class ScrapModel {
  @ApiProperty({
    example: '342342412123',
    description: '게시글 ID',
  })
  articleId: string;

  @ApiProperty({
    example: '제목이얌',
    description: '게시글 제목',
  })
  title: string;

  @ApiProperty({
    example: '고려대학교',
    description: '주최자/기관',
  })
  organization: string;

  @ApiProperty({
    example: 6,
    description: '조회수',
  })
  viewCount: number;

  @ApiProperty({
    example: 5,
    description: '스크랩 수',
  })
  scrapCount: number;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: '썸네일 이미지 경로',
  })
  thumbnailPath: string;

  @ApiProperty({
    example: 'tag1,tag2',
    description: '태그 목록. 배열로 구현',
  })
  tags: string[];
}
