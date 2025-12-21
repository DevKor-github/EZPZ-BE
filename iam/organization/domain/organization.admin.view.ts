import { ApiProperty } from '@nestjs/swagger';

export class OrganizationAdminView {
  @ApiProperty({
    example: 'org-12345',
    description: '고유 식별자',
  })
  id: string;

  @ApiProperty({
    example: '서울대학교',
    description: '기관 이름',
  })
  name: string;

  @ApiProperty({
    example: '02-1234-5678',
    description: '기관 연락처',
  })
  contact: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: '생성 일자',
  })
  createdAt: Date;
}
