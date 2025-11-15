import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleViewEntity } from './article.view.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { ArticleReader } from '../domain/article.reader';
import { ArticleModel } from '../domain/article.model';
import { ArticleViewMapper } from './article.view.mapper';

export class ArticleReaderImpl implements ArticleReader {
  constructor(
    @InjectRepository(ArticleViewEntity)
    private readonly ormRepository: EntityRepository<ArticleViewEntity>,
  ) {}

  async findAllByOrganizationId(organizationId: string): Promise<ArticleModel[]> {
    const articles = await this.ormRepository.find({ organizationId });

    return articles.map((article) => ArticleViewMapper.toModel(article));
  }
}
