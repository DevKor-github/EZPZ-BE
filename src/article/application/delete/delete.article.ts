import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Injectable()
export class DeleteArticle {
  constructor(@InjectRepository(ArticleEntity) private readonly repo: ArticleRepository) {}

  async delete(id: string): Promise<void> {
    await this.repo.deleteById(id);
  }
}
