import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleDetailDto } from '../dto/article.detail.dto';

@Injectable()
export class ArticleDetail {
  constructor(@InjectRepository(ArticleEntity) private readonly repo: ArticleRepository) {}

  async getDetail(id: string): Promise<ArticleDetailDto> {
    const article = await this.repo.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    return article;
  }
}
