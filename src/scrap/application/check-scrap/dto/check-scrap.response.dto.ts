import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CheckScrapResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '스크랩 여부',
    example: true,
  })
  isScrapped: boolean;
}
