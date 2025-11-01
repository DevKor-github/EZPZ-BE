import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
