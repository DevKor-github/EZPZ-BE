import { IsNotEmpty, IsString } from 'class-validator';

export class GetArticleDetailRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
