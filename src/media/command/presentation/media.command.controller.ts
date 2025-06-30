import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneratePresignedUrlUseCase } from '../application/generate-presigned-url/generate-presigned-url.use-case';
import { GeneratePresignedUrlRequestDto } from '../application/generate-presigned-url/dto/generate-presigned-url.request.dto';
import { GeneratePresignedUrlResponseDto } from '../application/generate-presigned-url/dto/generate-presigned-url.response.dto';
import { MediaCommandDocs } from './media.command.docs';

@ApiTags('media')
@Controller('media')
export class MediaCommandController {
  constructor(private readonly generatePresignedUrlUsecCase: GeneratePresignedUrlUseCase) {}

  @Post('presigned-url')
  @MediaCommandDocs('presignedUrl')
  async generatePresignedUrl(
    @Body() reqDto: GeneratePresignedUrlRequestDto,
  ): Promise<GeneratePresignedUrlResponseDto[]> {
    return await this.generatePresignedUrlUsecCase.execute(reqDto);
  }
}
