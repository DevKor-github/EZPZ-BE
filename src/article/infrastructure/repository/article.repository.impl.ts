import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleEntity } from '../orm-entity/article.entity';

export class ArticleRepositoryImpl extends EntityRepository<ArticleEntity> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);
    await this.em.persistAndFlush(articleEntity);
  }
}
