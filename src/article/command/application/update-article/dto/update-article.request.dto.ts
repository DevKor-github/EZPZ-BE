import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateArticleRequestDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  organization?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  startAt?: string;

  @IsString()
  @IsOptional()
  endAt?: string;

  @IsString()
  @IsOptional()
  registrationUrl?: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  tags?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  mediaIds?: string[];
}
