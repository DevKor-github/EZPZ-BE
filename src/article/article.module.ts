import { Module } from '@nestjs/common';
import { ArticleRepository } from './domain/repository/article.repository';
import { ArticleRepositoryImpl } from './infrastructure/repository/article.repository.impl';

@Module({})
export class ArticleModule {
  providers: [
    {
      provide: ArticleRepository;
      useClass: ArticleRepositoryImpl;
    },
  ];
}
