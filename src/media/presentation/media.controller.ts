import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadFileUseCase } from '../application/upload-file/upload-file.use-case';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadRequestDto } from '../application/upload-file/dto/upload.request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly uploadFileUsecCase: UploadFileUseCase) {}

  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload')
  async upload(
    @Body() uploadRequestDto: UploadRequestDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<void> {
    console.log(uploadRequestDto);
    await this.uploadFileUsecCase.execute(uploadRequestDto, files);
  }
}
