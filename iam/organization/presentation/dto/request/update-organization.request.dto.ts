import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrganizationReqDto {
  @ApiProperty({
    description: '기관/단체 이름',
    example: '한국스타트업협회',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: '연락처',
    example: '010-1234-5678',
    required: false,
  })
  @IsString()
  @IsOptional()
  contact?: string;
}
