import { IsNotEmpty, IsString } from 'class-validator';

export class GetArticleDetailRequestDto {
  @IsString()
  @IsNotEmpty()
  articleId: string;
}
