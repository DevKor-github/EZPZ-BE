import { EntityRepository } from '@mikro-orm/mysql';
import { Article } from 'src/article/domain/entity/article';
import { ArticleRepository } from 'src/article/domain/repository/article.repository';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleEntity } from '../orm-entity/article.entity';
import { Tag } from 'src/tag/domain/entity/tag';
import { TagMapper } from 'src/tag/infrastructure/mapper/tag.mapper';

export class ArticleRepositoryImpl extends EntityRepository<ArticleEntity> implements ArticleRepository {
  async save(article: Article): Promise<void> {
    const articleEntity = ArticleMapper.toEntity(article);
    await this.em.persistAndFlush(articleEntity);
  }

  async findByTags(tags: Tag[]): Promise<Article[] | undefined> {
    const tagEntities = tags.map((tag) => TagMapper.toEntity(tag));
    const articles = await this.em.find(ArticleEntity, { tags: { $in: tagEntities } });
    return articles.map((article) => ArticleMapper.toDomain(article));
  }
}
