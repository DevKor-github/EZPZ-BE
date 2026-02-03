import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SearchType {
  TITLE = 'title',
  ORGANIZATION = 'organization',
  ALL = 'all',
}

export class GetArticleSearchRequestDto {
  @ApiProperty({
    description: '검색어',
    example: '대동제',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({
    description: '검색 유형 (title: 제목 검색, organization: 주관 기관 검색, all: 전체 검색)',
    example: 'all',
    enum: SearchType,
    required: false,
    default: SearchType.ALL,
  })
  @IsEnum(SearchType)
  @IsOptional()
  searchType?: SearchType = SearchType.ALL;
}
