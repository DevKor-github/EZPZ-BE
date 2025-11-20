import { Inject, Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Article } from '../../domain/article';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { Tag } from 'src/tag/domain/entity/tag';
import { TAG_REPOSITORY, TagRepository } from 'src/tag/domain/repository/tag.repository';
import { CreateArticleCommand } from './create-article.command';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepo: ArticleCommandRepository,
    @Inject(TAG_REPOSITORY)
    private readonly tagRepo: TagRepository,
  ) {}

  async execute(command: CreateArticleCommand): Promise<CreateArticleResponseDto> {
    const tags: Tag[] = [];
    const articleId = Identifier.create();

    for (const tag of command.tags) {
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
      title: command.title,
      organizationId: Identifier.from(command.organizationId),
      organization: command.organization,
      description: command.description,
      location: command.location,
      startAt: new Date(command.startAt),
      endAt: new Date(command.endAt),
      registrationUrl: command.registrationUrl,
      registrationStartAt: command.registrationStartAt ? new Date(command.registrationStartAt) : undefined,
      registrationEndAt: command.registrationEndAt ? new Date(command.registrationEndAt) : undefined,
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
