import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAdminRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '관리자 아이디',
    example: 'org123',
    required: true,
  })
  accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '관리자 비밀번호',
    example: 'password123',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '관리자명',
    example: 'Admin Name',
    required: true,
  })
  name: string;
}
