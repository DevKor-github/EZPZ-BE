import { IsString } from 'class-validator';

export class CreateArticleResponseDto {
  @IsString()
  articleId: string;
}
