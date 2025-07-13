import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class FileInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '파일명',
    example: 'aaaaaa.png',
  })
  fileName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'mimetype',
    example: 'image/jpg',
  })
  mimeType: string;
}

export class GeneratePresignedUrlRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 ID',
    example: '1231312124',
  })
  articleId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  @ApiProperty({
    description: '썸네일 정보',
    type: FileInfo,
  })
  thumbnailInfo: FileInfo;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  @ApiProperty({
    description: '파일 정보 목록',
    type: [FileInfo],
  })
  fileInfoList: FileInfo[];
}
