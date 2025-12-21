import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetAllOrganizationsRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  cursorId?: string;

  @IsOptional()
  @IsDateString()
  cursorDate?: string;
}
