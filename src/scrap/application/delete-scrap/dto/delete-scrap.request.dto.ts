import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteScrapRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 ID',
    example: '244123142342',
  })
  articleId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 ID',
    example: '23523423242',
  })
  userId: string;
}
