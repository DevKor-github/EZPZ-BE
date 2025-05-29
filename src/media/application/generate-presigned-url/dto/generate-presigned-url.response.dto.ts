import { IsNotEmpty, IsString } from 'class-validator';

export class GeneratePresignedUrlResponseDto {
  @IsString()
  @IsNotEmpty()
  presignedUrl: string;
}
