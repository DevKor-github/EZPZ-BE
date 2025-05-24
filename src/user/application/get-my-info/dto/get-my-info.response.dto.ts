import { IsNotEmpty, IsString } from 'class-validator';

export class GetMyInfoResponseDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
