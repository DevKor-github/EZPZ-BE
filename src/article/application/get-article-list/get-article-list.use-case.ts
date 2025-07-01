import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { GetArticleListRequestDto } from 'src/article/application/get-article-list/dto/get-article-list.request.dto';
import { GetArticleListResponseDto } from 'src/article/application/get-article-list/dto/get-article-list.response.dto';
import { Article } from 'src/article/domain/entity/article';

@Injectable()
export class GetArticleListUseCase {
  constructor(@Inject(ARTICLE_REPOSITORY) private readonly repo: ArticleRepository) {}

  async execute(requestDto: GetArticleListRequestDto): Promise<GetArticleListResponseDto> {
    const articles = await this.repo.findList(requestDto);

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
