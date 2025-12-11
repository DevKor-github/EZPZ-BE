import { ApiProperty } from '@nestjs/swagger';

export class OrganizationView {
  @ApiProperty({
    example: '고려대학교 동아리연합회',
    description: '기관명',
  })
  name: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '연락처',
  })
  contact: string;
}
