import { IsOptional, IsArray, IsBoolean, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'createdAt',
    required: false,
    enum: ['createdAt', 'scrapCount', 'viewCount'],
  })
  @IsOptional()
  @IsIn(['createdAt', 'scrapCount', 'viewCount'])
  sort?: 'createdAt' | 'scrapCount' | 'viewCount';
}
