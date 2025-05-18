import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { Article } from 'src/article/domain/entity/article';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Injectable()
export class ArticleCreate {
  constructor(@InjectRepository(ArticleEntity) private readonly repo: ArticleRepository) {}

  async create(article: Article): Promise<void> {
    await this.repo.save(article);
  }
}
