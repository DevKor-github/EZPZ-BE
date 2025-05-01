import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleEntity } from '../orm-entity/article.entity';

export class ArticleRepositoryImpl extends EntityRepository<Article> implements ArticleRepository {
  async save(articleEntity: ArticleEntity): Promise<void> {
    await this.em.persistAndFlush(articleEntity);
  }
}
