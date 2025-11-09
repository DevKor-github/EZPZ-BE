import { ApiProperty } from '@nestjs/swagger';

export class CheckAccountIdResponseDto {
  @ApiProperty({
    description: '중복 여부',
    example: false,
  })
  isDuplicated: boolean;
}
