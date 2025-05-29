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
  articleId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FileInfo)
  fileInfoList: FileInfo[];
}
