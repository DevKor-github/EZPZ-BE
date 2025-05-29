import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMyInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 이메일',
    example: 'aaaaaaa@aaaaa.com',
  })
  email: string;
}
