import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '아이디',
    example: 'org_123456',
  })
  accountId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  password: string;
}
