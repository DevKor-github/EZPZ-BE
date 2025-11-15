import { ArticleModel } from '../domain/article.model';
import { ArticleViewEntity } from './article.view.entity';

export class ArticleViewMapper {
  static toModel(entity: ArticleViewEntity): ArticleModel {
    const model = new ArticleModel();
    model.id = entity.id;
    model.organizationId = entity.organizationId;
    model.title = entity.title;
    model.organization = entity.organization;
    model.thumbnailPath = entity.thumbnailPath;
    model.scrapCount = entity.scrapCount;
    model.viewCount = entity.viewCount;
    model.tags = entity.tags ? entity.tags.split(',').map((tag) => tag.trim()) : [];
    model.startAt = entity.startAt.toISOString();
    model.endAt = entity.endAt.toISOString();

    return model;
  }
}
