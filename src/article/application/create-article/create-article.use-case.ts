import { Inject, Injectable } from '@nestjs/common';
import { ARTICLE_REPOSITORY, ArticleRepository } from 'src/article/domain/repository/article.repository';
import { CreateArticleRequestDto } from 'src/article/application/create-article/dto/create-article.request.dto';
import { CreateArticleResponseDto } from 'src/article/application/create-article/dto/create-article.response.dto';
import { Article } from 'src/article/domain/entity/article';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { TAG_REPOSITORY, TagRepository } from 'src/tag/domain/repository/tag.repository';
import { Tag } from 'src/tag/domain/entity/tag';
// import { GeneratePresignedUrlUseCase } from 'src/media/application/generate-presigned-url/generate-presigned-url.use-case';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_REPOSITORY) private readonly articleRepo: ArticleRepository,
    @Inject(TAG_REPOSITORY) private readonly tagRepo: TagRepository,
    // private readonly generatePresignedUrlUseCase: GeneratePresignedUrlUseCase,
  ) {}

  async execute(requestDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    const tags: Tag[] = [];
    const articleId = Identifier.create();

    for (const tag of requestDto.tags) {
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
      title: requestDto.title,
      organization: requestDto.organization,
      description: requestDto.description,
      location: requestDto.location,
      startAt: new Date(requestDto.startAt),
      endAt: new Date(requestDto.endAt),
      registrationUrl: requestDto.registrationUrl,
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
