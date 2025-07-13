import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class ImageUrlInfo {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '이미지 경로',
    example: 'https://aaaaaaa.com/aaaa.png',
  })
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
  @Type(() => ImageUrlInfo)
  @ApiProperty({
    description: '썸네일 정보',
    type: ImageUrlInfo,
  })
  thumbnailInfo: ImageUrlInfo;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ImageUrlInfo)
  @ApiProperty({
    description: '파일 정보 목록',
    type: ImageUrlInfo,
  })
  fileInfoList: ImageUrlInfo[];
}
