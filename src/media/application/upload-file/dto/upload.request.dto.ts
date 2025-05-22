import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UploadRequestDto {
  @IsString()
  @IsNotEmpty()
  articleId: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  isThumbnail: boolean;
}
