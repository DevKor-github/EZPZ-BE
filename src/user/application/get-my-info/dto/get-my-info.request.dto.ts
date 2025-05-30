import { IsNotEmpty, IsString } from 'class-validator';

export class GetMyInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
