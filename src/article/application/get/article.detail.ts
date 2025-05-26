import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleDetailDto } from '../dto/article.detail.dto';
import { MediaRepository } from 'src/media/domain/repository/media.repository';
import { MediaEntity } from 'src/media/infrastructure/orm-entity/media.entity';

@Injectable()
export class ArticleDetail {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepo: ArticleRepository,
    @InjectRepository(MediaEntity) private readonly mediaRepo: MediaRepository,
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
