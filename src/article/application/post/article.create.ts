import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleCreateDto } from 'src/article/application/dto/article.create.dto';
import { FileUploadService } from 'src/article/application/post/file.upload';
import { Article } from 'src/article/domain/entity/article';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { Tag } from 'src/tag/domain/entity/tag';

@Injectable()
export class ArticleCreate {
  constructor(
    @InjectRepository(ArticleEntity) private readonly repo: ArticleRepository,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createDto: ArticleCreateDto,
    files: {
      thumbnail: Express.Multer.File;
      media: Express.Multer.File[];
    },
  ): Promise<void> {
    // 파일 업로드 처리리
    const thumbnailId = await this.fileUploadService.upload(files.thumbnail);
    const mediaIds = await Promise.all(files.media.map((file) => this.fileUploadService.upload(file)));

    // Article 도메인 엔티티 생성성
    const article = Article.create({
      id: Identifier.create(),
      title: createDto.title,
      organization: createDto.organization,
      description: createDto.description,
      location: createDto.location,
      startAt: new Date(createDto.startAt),
      endAt: new Date(createDto.endAt),
      registrationUrl: createDto.registrationUrl,
      scrapCount: 0,
      viewCount: 0,
      mediaIds: [thumbnailId, ...mediaIds].map((id) => Identifier.from(id)),
      tags: createDto.tags.map((tag) =>
        Tag.create({
          id: Identifier.create(),
          name: tag,
          articleIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.repo.save(article);
  }
}
