import { Scrap } from '../domain/scrap';
import { ScrapCommandRepository } from '../domain/scrap.command.repository';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { ScrapEntity } from './scrap.entity';
import { NotFoundException } from '@nestjs/common';
import { ScrapMapper } from './scrap.mapper';
import { InjectRepository } from '@mikro-orm/nestjs';

export class ScrapCommandRepositoryImpl implements ScrapCommandRepository {
  constructor(
    @InjectRepository(ScrapEntity)
    private readonly scrapOrmRepository: EntityRepository<ScrapEntity>,
    private readonly em: EntityManager,
  ) {}

  async save(scrap: Scrap): Promise<void> {
    const userScrapEntity = ScrapMapper.toEntity(scrap);
    await this.em.persistAndFlush(userScrapEntity);
  }

  async deleteByArticleIdAndUserId(articleId: string, userId: string): Promise<void> {
    const scrapEntity = await this.scrapOrmRepository.findOne({ article: { id: articleId }, user: { id: userId } });
    if (!scrapEntity) throw new NotFoundException('스크랩이 존재하지 않습니다.');

    await this.em.removeAndFlush(scrapEntity);
  }

  async findByArticleIdAndUserId(articleId: string, userId: string): Promise<Scrap> {
    const scrapEntity = await this.scrapOrmRepository.findOne({ article: { id: articleId }, user: { id: userId } });
    if (!scrapEntity) throw new NotFoundException('스크랩이 존재하지 않습니다.');

    const scrap = ScrapMapper.toDomain(scrapEntity);

    return scrap;
  }
}
