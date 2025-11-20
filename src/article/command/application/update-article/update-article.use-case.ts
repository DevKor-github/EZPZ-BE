import { Inject, Injectable } from '@nestjs/common';
import { Identifier } from 'src/shared/core/domain/identifier';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { Tag } from 'src/tag/domain/entity/tag';
import { TAG_REPOSITORY, TagRepository } from 'src/tag/domain/repository/tag.repository';
import { MEDIA_COMMAND_REPOSITORY, MediaCommandRepository } from 'src/media/command/domain/media.command.repository';
import { UpdateArticleCommand } from './update-article.command';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject(ARTICLE_COMMAND_REPOSITORY)
    private readonly articleCommandRepo: ArticleCommandRepository,
    @Inject(TAG_REPOSITORY)
    private readonly tagRepo: TagRepository,
    @Inject(MEDIA_COMMAND_REPOSITORY)
    private readonly mediaCommandRepo: MediaCommandRepository,
  ) {}

  async execute(command: UpdateArticleCommand): Promise<void> {
    // 기존 Article 조회
    const article = await this.articleCommandRepo.findById(command.id);

    // 태그 처리
    if (command.tags !== undefined) {
      const tags: Tag[] = [];

      for (const tagName of command.tags) {
        const existingTag = await this.tagRepo.findByName(tagName);

        if (!existingTag) {
          const newTag = Tag.create({
            id: Identifier.create(),
            name: tagName,
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

      // Article에 태그 설정
      article.setTags(tags);
    }

    // Article 업데이트
    article.update({
      title: command.title,
      organization: command.organization,
      description: command.description,
      location: command.location,
      startAt: command.startAt ? new Date(command.startAt) : undefined,
      endAt: command.endAt ? new Date(command.endAt) : undefined,
      registrationUrl: command.registrationUrl,
      registrationStartAt: command.registrationStartAt ? new Date(command.registrationStartAt) : undefined,
      registrationEndAt: command.registrationEndAt ? new Date(command.registrationEndAt) : undefined,
    });

    await this.articleCommandRepo.update(article);
  }
}
