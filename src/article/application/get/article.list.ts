import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/application/dto/article.list.item';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Injectable()
export class ArticleList {
  constructor(@InjectRepository(ArticleEntity) private readonly repo: ArticleRepository) {}

  async getList(filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    return this.repo.findList(filter);
  }
}
