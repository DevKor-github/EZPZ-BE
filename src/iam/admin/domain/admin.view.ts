import { ApiProperty } from '@nestjs/swagger';

export class AdminView {
  @ApiProperty({
    example: '이름',
    description: '관리자 이름',
  })
  name: string;
}
