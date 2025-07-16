import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class UpdateArticleRequestDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '2024 스타트업 컨퍼런스',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '주최 기관/단체',
    example: '한국스타트업협회',
    required: false,
  })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({
    description: '게시글 내용 설명',
    example: '최신 기술 트렌드와 창업 노하우를 공유하는 컨퍼런스입니다.',
    required: false,
  })
  @IsString()
  @Length(0)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: '행사 장소',
    example: '서울 강남구 테헤란로 123',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: '행사 시작 일시 (ISO 8601 형식)',
    example: '2024-03-15T10:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  startAt?: string;

  @ApiProperty({
    description: '행사 종료 일시 (ISO 8601 형식)',
    example: '2024-03-15T18:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  endAt?: string;

  @ApiProperty({
    description: '등록/신청 URL',
    example: 'https://example.com/register',
    required: false,
  })
  @IsString()
  @Length(0)
  @IsOptional()
  registrationUrl?: string;

  @ApiProperty({
    description: '관련 태그 목록',
    example: ['스타트업', '기술', '컨퍼런스'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => String)
  tags?: string[];
}
