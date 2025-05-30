import { Module } from '@nestjs/common';
import { ScrapController } from './presentation/scrap.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScrapEntity } from 'src/scrap/infrastructure/entity/scrap.entity';
import { SCRAP_REPOSITORY } from './domain/repository/scrap.repository';
import { ScrapRepositoryImpl } from './infrastructure/repository/scrap.repository.impl';
import { UserEntity } from 'src/user/infrastructure/orm-entity/user.entity';
import { ArticleEntity } from 'src/article/infrastructure/orm-entity/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ScrapEntity, UserEntity, ArticleEntity])],
  providers: [
    {
      provide: SCRAP_REPOSITORY,
      useClass: ScrapRepositoryImpl,
    },
  ],
  controllers: [ScrapController],
})
export class ScrapModule {}
