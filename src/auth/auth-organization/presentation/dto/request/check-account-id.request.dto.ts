import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAccountIdRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '계정 ID',
    example: 'organization123',
    required: true,
  })
  accountId: string;
}
