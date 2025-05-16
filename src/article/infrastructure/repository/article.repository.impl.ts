import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleEntity } from '../orm-entity/article.entity';
import { ArticleListItem } from 'src/article/domain/entity/article.list.item';
import { ArticleDetailDto } from 'src/article/application/dto/article.detail.dto';

export class ArticleRepositoryImpl extends EntityRepository<ArticleEntity> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);
    await this.em.persistAndFlush(articleEntity);
  }

  async findById(id: string): Promise<ArticleDetailDto | null> {
    const articleEntity = await this.findOne({ id }, { populate: ['tags', 'media'], strategy: 'joined' });

    if (!articleEntity) {
      return null;
    }

    // 관계 초기화를 위한 명시적 populate
    await this.em.populate(articleEntity, ['tags', 'media']);
    await this.em.populate(articleEntity.tags, ['articles']);

    const article = {
      id: articleEntity.id,
      title: articleEntity.title,
      organization: articleEntity.organization,
      description: articleEntity.description,
      location: articleEntity.location,
      startAt: articleEntity.startAt.toISOString(),
      endAt: articleEntity.endAt.toISOString(),
      thumbnail_path: articleEntity.media.find((m) => m.isThumbnail)?.mediaPath ?? '',
      imagePaths: articleEntity.media.map((m) => m.mediaPath),
      scrapCount: articleEntity.scrapCount,
      viewCount: articleEntity.viewCount,
      registrationUrl: articleEntity.registrationUrl,
      tags: articleEntity.tags.map((tag) => tag.name),
    };

    return article;
  }

  async findList(params: {
    tags?: string[];
    isFinished?: boolean;
    sort?: 'createdAt' | 'scrapCount' | 'viewCount';
  }): Promise<ArticleListItem[]> {
    if (!this.em) {
      throw new Error('em is not initialized');
    }

    const now = new Date();

    // QueryBuilder 생성
    const query = this.em
      .createQueryBuilder(ArticleEntity, 'a')
      .select(['a.id', 'a.title', 'a.organization', 'a.scrapCount', 'a.viewCount'])
      .leftJoinAndSelect('a.tags', 't')
      .leftJoinAndSelect('a.media', 'm');

    // 태그 필터링
    if (params.tags?.length) {
      query.where({ 't.name': { $in: params.tags } });
    }

    // 종료 포함 여부 필터링
    if (params.isFinished !== undefined) {
      if (params.isFinished === false) {
        query.andWhere({ 'a.endAt': { $gt: now } });
      }
    }

    // 정렬 처리
    switch (params.sort) {
      case 'createdAt':
        query.orderBy({ 'a.createdAt': 'DESC' });
        break;
      case 'scrapCount':
        query.orderBy({ 'a.scrapCount': 'DESC' });
        break;
      case 'viewCount':
        query.orderBy({ 'a.viewCount': 'DESC' });
        break;
      default:
        query.orderBy({ 'a.createdAt': 'DESC' });
        break;
    }

    // 중복 row 제거 후 실행
    const entities = await query.getResultList();

    // 엔티티를 도메인 객체로 변환
    return entities.map((entity) => ({
      id: entity.id,
      title: entity.title,
      organization: entity.organization,
      thumbnailPath: entity.media.find((media) => media.isThumbnail)?.mediaPath ?? '',
      scrapCount: entity.scrapCount,
      viewCount: entity.viewCount,
      tags: entity.tags.map((tag) => tag.name),
    }));
  }
}
