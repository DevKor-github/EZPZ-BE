import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserQuery {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
