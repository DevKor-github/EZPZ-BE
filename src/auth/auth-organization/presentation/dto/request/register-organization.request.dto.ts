import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterOrganizationRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '조직 아이디',
    example: 'org123',
    required: true,
  })
  accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '조직 비밀번호',
    example: 'password123',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '조직명',
    example: 'Organization Name',
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '연락처',
    example: '010-1234-5678',
    required: true,
  })
  contact: string;
}
