import { Controller, Get, Query } from '@nestjs/common';
import { ArticleList } from 'src/article/application/get/article.list';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/domain/entity/article.list.item';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleList) {}

  @Get()
  async list(@Query() filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    return this.service.getList(filter);
  }
}
