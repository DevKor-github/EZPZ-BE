import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  organization: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  startAt: string;

  @IsString()
  @IsNotEmpty()
  endAt: string;

  @IsString()
  registrationUrl: string;

  @IsArray()
  @Type(() => String)
  tags: string[];
}
