import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleFilterDto } from 'src/article/application/dto/article.filter.dto';
import { ArticleListItem } from 'src/article/application/dto/article.list.dto';
import { Article } from 'src/article/domain/entity/article';

@Injectable()
export class ArticleList {
  constructor(@Inject(ARTICLE_REPOSITORY) private readonly repo: ArticleRepository) {}

  async getList(filter: ArticleFilterDto): Promise<ArticleListItem[]> {
    const articles = await this.repo.findList(filter);

    return articles.map((article: Article) => ({
      id: article.id.value,
      title: article.title,
      organization: article.organization,
      thumbnailPath: article.mediaIds[0]?.value ?? '',
      scrapCount: article.scrapCount,
      viewCount: article.viewCount,
      tags: article.tags.map((tag) => tag.name),
    }));
  }
}
