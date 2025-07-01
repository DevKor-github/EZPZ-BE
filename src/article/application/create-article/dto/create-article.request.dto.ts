import { IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticleRequestDto {
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
}
