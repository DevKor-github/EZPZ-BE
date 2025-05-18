import { Controller, Get, Query, Param, Post, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { ArticleList } from 'src/article/application/get/article.list';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/application/dto/article.list.item';
import { ArticleDetail } from 'src/article/application/get/article.detail';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ArticleCreate } from 'src/article/application/post/article.create';
import { ArticleCreateDto } from 'src/article/application/dto/article.create.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly listService: ArticleList,
    private readonly detailService: ArticleDetail,
    private readonly createService: ArticleCreate,
  ) {}

  @Get()
  async list(@Query() filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    return this.listService.getList(filter);
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<ArticleDetailDto> {
    return this.detailService.getDetail(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'media', maxCount: 10 },
    ]),
  )
  async create(
    @Body() createDto: ArticleCreateDto,
    @UploadedFiles()
    files: {
      thumbnail: Express.Multer.File;
      media: Express.Multer.File[];
    },
  ) {
    return this.createService.create(createDto, files);
  }
}
