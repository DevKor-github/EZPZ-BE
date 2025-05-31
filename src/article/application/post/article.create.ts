import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleCreateRequestDto, ArticleCreateResponseDto } from 'src/article/application/dto/article.create.dto';
import { Article } from 'src/article/domain/entity/article';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { TagRepository } from 'src/tag/domain/repository/tag.repository';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { Tag } from 'src/tag/domain/entity/tag';
// import { GeneratePresignedUrlUseCase } from 'src/media/application/generate-presigned-url/generate-presigned-url.use-case';

@Injectable()
export class ArticleCreate {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepo: ArticleRepository,
    @InjectRepository(TagEntity) private readonly tagRepo: TagRepository,
    // private readonly generatePresignedUrlUseCase: GeneratePresignedUrlUseCase,
  ) {}

  async create(createDto: ArticleCreateRequestDto): Promise<ArticleCreateResponseDto> {
    const tags: Tag[] = [];
    const articleId = Identifier.create();

    for (const tag of createDto.tags) {
      const existingTag = await this.tagRepo.findByName(tag);

      if (!existingTag) {
        const newTag = Tag.create({
          id: Identifier.create(),
          name: tag,
          articleIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await this.tagRepo.save(newTag);
        tags.push(newTag);
      } else {
        tags.push(existingTag);
      }
    }

    // Article 도메인 엔티티 생성
    const article = Article.create({
      id: articleId,
      title: createDto.title,
      organization: createDto.organization,
      description: createDto.description,
      location: createDto.location,
      startAt: new Date(createDto.startAt),
      endAt: new Date(createDto.endAt),
      registrationUrl: createDto.registrationUrl,
      scrapCount: 0,
      viewCount: 0,
      mediaIds: [],
      tags: tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.articleRepo.save(article);

    // let presignedUrls: string[] = [];
    // if (createDto.mediaInfo && createDto.mediaInfo.length > 0) {
    //   const presignedUrlRequest = {
    //     articleId: articleId.value,
    //     fileInfoList: createDto.mediaInfo.map((media) => ({
    //       fileName: media.fileName,
    //       mimeType: media.mimeType,
    //       isThumbnail: media.isThumbnail ?? false,
    //     })),
    //   };

    //   const presignedUrlResponses = await this.generatePresignedUrlUseCase.execute(presignedUrlRequest);
    //   presignedUrls = presignedUrlResponses.map((response) => response.presignedUrl);
    // }

    return { articleId: articleId.value };
  }
}
