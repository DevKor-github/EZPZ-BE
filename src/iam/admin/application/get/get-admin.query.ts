import { IsNotEmpty, IsString } from 'class-validator';

export class GetAdminQuery {
  @IsString()
  @IsNotEmpty()
  adminId: string;
}
