import { IsString, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class MediaInfo {
  @IsString()
  fileName: string;

  @IsString()
  mimeType: string;

  @IsOptional()
  @IsBoolean()
  isThumbnail?: boolean;
}

export class ArticleCreateRequestDto {
  @IsString()
  title: string;

  @IsString()
  organization: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;

  @IsString()
  registrationUrl: string;

  @IsArray()
  @Type(() => String)
  tags: string[];

  // @IsArray()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => MediaInfo)
  // mediaInfo?: MediaInfo[];
}

export class ArticleCreateResponseDto {
  @IsString()
  articleId: string;

  // @IsArray()
  // @IsString({ each: true })
  // mediaIds: string[];
}
