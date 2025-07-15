import { ApiProperty } from '@nestjs/swagger';

export class ArticleModel {
  @ApiProperty({
    example: '21231423423',
    description: '게시글 ID',
  })
  id: string;

  @ApiProperty({
    example: '제목',
    description: '게시글 제목',
  })
  title: string;

  @ApiProperty({
    example: '고려대학교',
    description: '게시글 작성자',
  })
  organization: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: '썸네일 이미지 경로',
  })
  thumbnailPath: string;

  @ApiProperty({
    example: 10,
    description: '스크랩 수',
  })
  scrapCount: number;

  @ApiProperty({
    example: 100,
    description: '조회 수',
  })
  viewCount: number;

  @ApiProperty({
    example: '태그1, 태그2',
    description: '게시글 태그 목록',
  })
  tags: string[];

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: '행사 시작 시간',
  })
  startAt: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: '행사 종료 시간',
  })
  endAt: string;
}
