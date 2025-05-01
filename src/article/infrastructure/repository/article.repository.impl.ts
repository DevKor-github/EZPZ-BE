import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';

export class ArticleRepositoryImpl extends EntityRepository<Article> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    await this.em.persistAndFlush(article);
  }
}
