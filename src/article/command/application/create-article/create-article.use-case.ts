import { Inject, Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Article } from '../../domain/article';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { Tag } from 'src/tag/domain/entity/tag';
import { TAG_REPOSITORY, TagRepository } from 'src/tag/domain/repository/tag.repository';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepo: ArticleCommandRepository,
    @Inject(TAG_REPOSITORY)
    private readonly tagRepo: TagRepository,
  ) {}

  async execute(reqDto: CreateArticleRequestDto): Promise<CreateArticleResponseDto> {
    const tags: Tag[] = [];
    const articleId = Identifier.create();

    for (const tag of reqDto.tags) {
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
      title: reqDto.title,
      organization: reqDto.organization,
      description: reqDto.description,
      location: reqDto.location,
      startAt: new Date(reqDto.startAt),
      endAt: new Date(reqDto.endAt),
      registrationUrl: reqDto.registrationUrl,
      scrapCount: 0,
      viewCount: 0,
      mediaIds: [],
      tags: tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.articleCommandRepo.save(article);

    return { articleId: articleId.value };
  }
}
