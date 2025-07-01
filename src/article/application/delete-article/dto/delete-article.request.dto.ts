import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteArticleRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
