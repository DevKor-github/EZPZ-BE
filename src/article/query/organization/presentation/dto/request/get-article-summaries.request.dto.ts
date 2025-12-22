import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetArticleSummariesRequestDto {
  @IsOptional()
  @Type(() => Number) // 문자열을 숫자로 변환
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
