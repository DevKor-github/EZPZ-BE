import { Injectable, Inject } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/domain/entity/article.list.item';

@Injectable()
export class ArticleList {
  constructor(@Inject('ArticleRepository') private readonly repo: ArticleRepository) {}

  async getList(filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    return this.repo.findList(filter);
  }
}
