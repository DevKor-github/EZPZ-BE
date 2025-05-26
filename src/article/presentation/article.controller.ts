import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleList } from 'src/article/application/get/article.list';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/application/dto/article.list.dto';
import { ArticleDetail } from 'src/article/application/get/article.detail';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';
import { ArticleCreate } from 'src/article/application/post/article.create';
import { ArticleCreateDto } from 'src/article/application/dto/article.create.dto';

@ApiTags('article')
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
  async create(@Body() createDto: ArticleCreateDto) {
    console.log('Received createDto:', createDto);
    return this.createService.create(createDto);
  }
}
