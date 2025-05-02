import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';

export class ArticleRepositoryImpl extends EntityRepository<Article> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);
    await this.em.persistAndFlush(articleEntity);
  }
}
