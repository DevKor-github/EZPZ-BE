import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeOrganizationPasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '현재 비밀번호',
    example: 'password123',
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '새 비밀번호',
    example: 'password123',
  })
  newPassword: string;
}
