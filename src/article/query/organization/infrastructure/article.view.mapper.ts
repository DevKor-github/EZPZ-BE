import { ArticleSummaryModel } from '../domain/article-summary.model';
import { ArticleModel } from '../domain/article.model';
import { ArticleViewEntity } from './article.view.entity';

export class ArticleViewMapper {
  static toModel(entity: ArticleViewEntity): ArticleModel {
    const model = new ArticleModel();
    model.id = entity.id;
    model.organizationId = entity.organizationId;
    model.title = entity.title;
    model.organization = entity.organization;
    model.description = entity.description;
    model.location = entity.location;
    model.thumbnailPath = entity.thumbnailPath;
    model.scrapCount = entity.scrapCount;
    model.viewCount = entity.viewCount;
    model.tags = entity.tags ? entity.tags.split(',').map((tag) => tag.trim()) : [];
    model.startAt = entity.startAt.toISOString();
    model.endAt = entity.endAt.toISOString();
    model.registrationStartAt = entity.registrationStartAt ? entity.registrationStartAt.toISOString() : undefined;
    model.registrationEndAt = entity.registrationEndAt ? entity.registrationEndAt.toISOString() : undefined;
    model.createdAt = entity.createdAt.toISOString();

    return model;
  }
}

export class ArticleSummaryViewMapper {
  static toModel(entity: ArticleViewEntity): ArticleSummaryModel {
    const model = new ArticleSummaryModel();
    model.id = entity.id;
    model.title = entity.title;
    model.organization = entity.organization;
    model.tags = entity.tags ? entity.tags.split(',').map((tag) => tag.trim()) : [];
    model.viewCount = entity.viewCount;
    model.createdAt = entity.createdAt.toISOString();

    return model;
  }
}
