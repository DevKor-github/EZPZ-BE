import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class FileInfo {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}

export class CreateMediaRequestDto {
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
  thumbnailInfo: FileInfo;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  @ApiProperty({
    description: '파일 정보 목록',
    example: [{ objectKey: '/images/1/afdadf' }],
  })
  fileInfoList: FileInfo[];
}
