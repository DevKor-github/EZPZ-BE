import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleDetailDto } from '../dto/article.detail.dto';
import { MEDIA_REPOSITORY, MediaRepository } from 'src/media/domain/repository/media.repository';

@Injectable()
export class ArticleDetail {
  constructor(
    @Inject(ARTICLE_REPOSITORY) private readonly articleRepo: ArticleRepository,
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepo: MediaRepository,
  ) {}

  async getDetail(id: string): Promise<ArticleDetailDto> {
    const article = await this.articleRepo.findById(id);

    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    const mediaEntities = await Promise.all(article.mediaIds.map(async (m) => this.mediaRepo.findById(m.value)));

    const result = {
      id: article.id.value,
      title: article.title,
      organization: article.organization,
      description: article.description,
      location: article.location,
      startAt: article.startAt.toISOString(),
      endAt: article.endAt.toISOString(),
      thumbnailPath: mediaEntities.find((m) => m?.isThumbnail)?.mediaPath ?? '',
      imagePaths: mediaEntities.map((m) => m?.mediaPath ?? ''),
      scrapCount: article.scrapCount,
      viewCount: article.viewCount,
      registrationUrl: article.registrationUrl,
      tags: article.tags.map((t) => t.name),
    };

    return result;
  }
}
