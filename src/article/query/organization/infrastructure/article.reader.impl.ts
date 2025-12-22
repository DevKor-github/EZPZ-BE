import { InjectRepository } from '@mikro-orm/nestjs';
import { ArticleViewEntity } from './article.view.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { ArticleReader } from '../domain/article.reader';
import { ArticleModel } from '../domain/article.model';
import { ArticleSummaryViewMapper, ArticleViewMapper } from './article.view.mapper';
import { ArticleSummaryModel } from '../domain/article-summary.model';

export class ArticleReaderImpl implements ArticleReader {
  constructor(
    @InjectRepository(ArticleViewEntity)
    private readonly ormRepository: EntityRepository<ArticleViewEntity>,
  ) {}

  async findById(articleId: string): Promise<ArticleModel> {
    const article = await this.ormRepository.findOneOrFail({ id: articleId });
    return ArticleViewMapper.toModel(article);
  }

  async findAllByOrganizationId(organizationId: string): Promise<ArticleModel[]> {
    const articles = await this.ormRepository.find({ organizationId }, { orderBy: { createdAt: 'DESC' } });

    return articles.map((article) => ArticleViewMapper.toModel(article));
  }

  async findAllByCursor(pageSize: number, cursorId?: string, cursorDate?: Date): Promise<ArticleSummaryModel[]> {
    const qb = this.ormRepository.createQueryBuilder('a');

    if (cursorDate && cursorId) {
      qb.where({
        $or: [
          { createdAt: { $lt: cursorDate } },
          {
            $and: [{ createdAt: cursorDate }, { id: { $lt: cursorId } }],
          },
        ],
      });
    }
    qb.orderBy({ createdAt: 'DESC', id: 'DESC' }).limit(pageSize + 1);

    const result = await qb.getResultList();

    return result.map((article) => ArticleSummaryViewMapper.toModel(article));
  }
}
