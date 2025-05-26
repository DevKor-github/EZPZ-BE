import { IsOptional, IsArray, IsBoolean, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class ArticleFilterDto {
  /** festival,expo -> ['festival', 'expo'] */
  @IsOptional()
  @Transform(({ value }: { value: string | undefined }) => (value ? value.split(',') : []))
  @IsArray()
  tags?: string[];

  /** 'true' → true, 'false' → false */
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFinished?: boolean;

  @IsOptional()
  @IsIn(['createdAt', 'scrapCount', 'viewCount'])
  sort?: 'createdAt' | 'scrapCount' | 'viewCount';
}
