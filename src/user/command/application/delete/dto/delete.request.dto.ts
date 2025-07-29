import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMyInfoRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
