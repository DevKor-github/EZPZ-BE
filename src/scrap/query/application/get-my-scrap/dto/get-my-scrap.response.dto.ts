import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetMyScrapResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 ID',
    example: '11212332423r',
  })
  articleId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 제목',
    example: '제목이얌',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '주최자/기관',
    example: '고려대학교',
  })
  organization: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 썸네일 이미지 경로',
    example: 'https://akdsfljlsdkfa.com/thumbnail.jpg',
  })
  thumbnailPath: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 스크랩 수',
    example: 10,
  })
  scrapCount: number;

  @IsArray()
  @ApiProperty({
    description: '게시글 태그 목록',
    example: ['태그1', '태그2'],
  })
  tags: string[];
}
