import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserView {
  @IsString()
  @ApiProperty({
    description: '사용자 이메일',
    example: 'aaaaaaa@aaaaa.com',
  })
  email: string;
}
