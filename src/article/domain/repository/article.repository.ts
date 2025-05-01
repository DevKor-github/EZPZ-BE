import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

export interface ArticleRepository {
  save(articleEntity: ArticleEntity): Promise<void>;
}
