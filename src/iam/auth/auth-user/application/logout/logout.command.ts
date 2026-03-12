import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutCommand {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
