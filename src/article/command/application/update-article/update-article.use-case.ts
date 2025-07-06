import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { ARTICLE_COMMAND_REPOSITORY, ArticleCommandRepository } from '../../domain/article.command.repository';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { Tag } from 'src/tag/domain/entity/tag';
import { TAG_REPOSITORY, TagRepository } from 'src/tag/domain/repository/tag.repository';
import { MEDIA_COMMAND_REPOSITORY, MediaCommandRepository } from 'src/media/command/domain/media.command.repository';

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

  async execute(articleId: string, reqDto: UpdateArticleRequestDto): Promise<void> {
    // 기존 Article 조회
    const article = await this.articleCommandRepo.findById(articleId);
    if (!article) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }

    // 태그 처리
    if (reqDto.tags !== undefined) {
      const tags: Tag[] = [];

      for (const tagName of reqDto.tags) {
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

      // Article의 tags를 직접 교체 (기존 관계 삭제 후 새 관계 설정)
      article.replaceTags(tags);
    }

    // 미디어 처리
    if (reqDto.mediaIds !== undefined && reqDto.mediaIds.length > 0) {
      // 삭제할 미디어 ID들을 직접 삭제
      await this.mediaCommandRepo.deleteByIds(reqDto.mediaIds);
    }

    // Article 업데이트
    article.update({
      title: reqDto.title,
      organization: reqDto.organization,
      description: reqDto.description,
      location: reqDto.location,
      startAt: reqDto.startAt ? new Date(reqDto.startAt) : undefined,
      endAt: reqDto.endAt ? new Date(reqDto.endAt) : undefined,
      registrationUrl: reqDto.registrationUrl,
    });

    await this.articleCommandRepo.update(article);
  }
}
