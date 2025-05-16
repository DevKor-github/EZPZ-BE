import { Controller, Get, Query, Param } from '@nestjs/common';
import { ArticleList } from 'src/article/application/get/article.list';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/domain/entity/article.list.item';
import { ArticleDetail } from 'src/article/application/get/article.detail';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly listService: ArticleList,
    private readonly detailService: ArticleDetail,
  ) {}

  @Get()
  async list(@Query() filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    return this.listService.getList(filter);
  }

  @Get(':id')
  async detail(@Param('id') id: string): Promise<ArticleDetailDto> {
    return this.detailService.getDetail(id);
  }
}
