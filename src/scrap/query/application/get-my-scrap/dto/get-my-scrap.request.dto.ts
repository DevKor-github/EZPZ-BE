import { IsNotEmpty, IsString } from 'class-validator';

export class GetMyScrapRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
