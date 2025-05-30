import { Body, Controller, Post } from '@nestjs/common';
import { GeneratePresignedUrlUseCase } from '../application/generate-presigned-url/generate-presigned-url.use-case';
import { GeneratePresignedUrlRequestDto } from '../application/generate-presigned-url/dto/generate-presigned-url.request.dto';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePresignedUrlResponseDto } from '../application/generate-presigned-url/dto/generate-presigned-url.response.dto';
import { MediaDocs } from './media.docs';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly generatePresignedUrlUsecCase: GeneratePresignedUrlUseCase) {}

  @Post('presigned-url')
  @MediaDocs('presignedUrl')
  async generatePresignedUrl(
    @Body() generatePresignedUrlRequestDto: GeneratePresignedUrlRequestDto,
  ): Promise<GeneratePresignedUrlResponseDto[]> {
    return await this.generatePresignedUrlUsecCase.execute(generatePresignedUrlRequestDto);
  }
}
