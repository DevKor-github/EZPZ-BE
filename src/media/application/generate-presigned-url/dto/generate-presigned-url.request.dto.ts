import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class FileInfo {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsBoolean()
  @IsNotEmpty()
  isThumbnail: boolean;
}

export class GeneratePresignedUrlRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 ID',
    example: '1231312124',
  })
  articleId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  @ApiProperty({
    description: '파일 정보 목록',
    example: [{ fileName: 'adfaebarc.jpg', mimeType: 'image/jpeg', isThumbnail: true }],
  })
  fileInfoList: FileInfo[];
}
