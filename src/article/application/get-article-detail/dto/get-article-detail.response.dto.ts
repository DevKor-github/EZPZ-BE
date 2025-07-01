import { IsString, IsNumber, IsArray } from 'class-validator';

export class GetArticleDetailResponseDto {
  @IsString()
  id: string;

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
  thumbnailPath: string;

  @IsArray()
  @IsString({ each: true })
  imagePaths: string[];

  @IsNumber()
  scrapCount: number;

  @IsNumber()
  viewCount: number;

  @IsString()
  registrationUrl: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
