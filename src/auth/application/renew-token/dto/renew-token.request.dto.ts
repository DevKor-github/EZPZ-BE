import { IsNotEmpty, IsString } from 'class-validator';

export class RenewTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  jti: string;
}
