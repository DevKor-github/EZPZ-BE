import { ApiProperty } from '@nestjs/swagger';

export class UserAdminView {
  @ApiProperty({
    example: 'user-12345',
    description: '고유 식별자',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '이메일 주소',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '생성 일자',
  })
  createdAt: string;
}
