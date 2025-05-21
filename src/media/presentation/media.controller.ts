import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadUseCase } from '../application/upload/upload.use-case';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadRequestDto } from '../application/upload/dto/upload.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly uploadUsecCase: UploadUseCase) {}

  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload')
  async upload(
    @Body() uploadRequestDto: UploadRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    console.log(uploadRequestDto);
    await this.uploadUsecCase.execute(uploadRequestDto, files);
  }
}
