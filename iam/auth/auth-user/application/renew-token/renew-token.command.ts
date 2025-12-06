import { IsNotEmpty, IsString } from 'class-validator';

export class RenewTokenCommand {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  jti: string;
}
