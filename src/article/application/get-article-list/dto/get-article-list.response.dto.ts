import { IsArray, IsString, IsNumber } from 'class-validator';

export class ArticleListItem {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  organization: string;

  @IsString()
  thumbnailPath: string;

  @IsNumber()
  scrapCount: number;

  @IsNumber()
  viewCount: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export type GetArticleListResponseDto = ArticleListItem[];
