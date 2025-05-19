import { Injectable } from '@nestjs/common';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';
import { ArticleCreateDto } from 'src/article/application/dto/article.create.dto';
import { Article } from 'src/article/domain/entity/article';
import { Identifier } from 'src/shared/domain/value-object/identifier';

@Injectable()
export class ArticleCreate {
  constructor(@InjectRepository(ArticleEntity) private readonly repo: ArticleRepository) {}

  async create(createDto: ArticleCreateDto): Promise<void> {
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
      mediaIds: [],
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.repo.save(article);
  }
}
