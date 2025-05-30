import { Controller, Get, Query, Param, Post, Body, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleList } from 'src/article/application/get/article.list';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/application/dto/article.list.dto';
import { ArticleDetail } from 'src/article/application/get/article.detail';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';
import { ArticleCreate } from 'src/article/application/post/article.create';
import { ArticleCreateRequestDto } from 'src/article/application/dto/article.create.dto';
import { DeleteArticle } from 'src/article/application/delete/delete.article';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly listService: ArticleList,
    private readonly detailService: ArticleDetail,
    private readonly createService: ArticleCreate,
    private readonly deleteService: DeleteArticle,
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
  async create(@Body() createDto: ArticleCreateRequestDto) {
    return this.createService.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteService.delete(id);
  }
}
