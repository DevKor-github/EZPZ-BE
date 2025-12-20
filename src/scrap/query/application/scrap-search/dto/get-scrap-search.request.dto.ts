import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetScrapSearchRequestDto {
  @ApiProperty({
    description: '검색어',
    example: '대동제',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
