import { InjectRepository } from '@mikro-orm/nestjs';
import { Article } from '../domain/article';
import { ArticleCommandRepository } from '../domain/article.command.repository';
import { ArticleMapper } from './article.mapper';
import { ArticleEntity } from './article.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { TagEntity } from 'src/tag/infrastructure/orm-entity/tag.entity';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export class ArticleCommandRepositoryImpl implements ArticleCommandRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly ormRepository: EntityRepository<ArticleEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);

    // Get references to existing tags
    const tagRefs = article.tags.map((tag) => {
      return this.em.getReference(TagEntity, tag.id.value);
    });
    articleEntity.tags.set(tagRefs);

    await this.em.persistAndFlush(articleEntity);
  }

  async update(article: Article): Promise<void> {
    // 기본 필드 업데이트
    await this.em.nativeUpdate(
      ArticleEntity,
      { id: article.id.value },
      {
        title: article.title,
        organization: article.organization,
        location: article.location,
        description: article.description,
        registrationUrl: article.registrationUrl,
        startAt: article.startAt,
        endAt: article.endAt,
        registrationStartAt: article.registrationStartAt,
        registrationEndAt: article.registrationEndAt,
        scrapCount: article.scrapCount,
        viewCount: article.viewCount,
      },
    );

    // 태그 관계 업데이트 (Article의 tags 사용)
    const articleEntity = await this.ormRepository.findOne({ id: article.id.value }, { populate: ['tags'] });
    if (articleEntity) {
      // 기존 태그 관계 제거
      articleEntity.tags.removeAll();

      // 새로운 태그 관계 설정
      const tagRefs = article.tags.map((tag) => {
        return this.em.getReference(TagEntity, tag.id.value);
      });
      articleEntity.tags.set(tagRefs);

      await this.em.flush();
    }
  }

  async deleteById(id: string): Promise<void> {
    // cascade 설정을 활용하여 entity를 먼저 조회
    const articleEntity = await this.ormRepository.findOne({ id }, { populate: ['media'] });

    if (articleEntity) {
      // entity를 삭제하면 cascade로 인해 media도 자동 삭제됨
      await this.em.removeAndFlush(articleEntity);
    }
  }

  async findById(id: string): Promise<Article> {
    const articleEntity = await this.ormRepository.findOne({ id }, { populate: ['tags', 'media'], strategy: 'joined' });
    if (!articleEntity) throw new CustomException(CustomExceptionCode.ARTICLE_NOT_FOUND);

    const article = ArticleMapper.toDomain(articleEntity);
    return article;
  }
}
