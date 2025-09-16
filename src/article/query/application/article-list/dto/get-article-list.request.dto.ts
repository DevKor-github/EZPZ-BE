import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsOptional } from 'class-validator';

export class GetArticleListRequestDto {
  @ApiProperty({
    description: '태그 필터 (콤마로 구분된 문자열)',
    example: 'festival,expo',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) => (value ? value.split(',') : []))
  @IsArray()
  tags?: string[];

  @ApiProperty({
    description: '종료된 행사만 필터링',
    example: 'true',
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFinished?: boolean;

  @ApiProperty({
    description: '정렬 기준',
    example: 'registrationEndAt',
    required: false,
    enum: ['registrationEndAt', 'scrapCount', 'viewCount'],
  })
  @IsOptional()
  @IsIn(['registrationEndAt', 'scrapCount', 'viewCount'])
  sortBy?: 'registrationEndAt' | 'scrapCount' | 'viewCount';

  @ApiProperty({
    description: '페이지 번호',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '페이지당 게시글 수',
    example: 10,
  })
  limit: number;
}
