import { Module } from '@nestjs/common';
import { TagRepository } from './domain/repository/tag.repository';
import { TagRepositoryImpl } from './infrastructure/repository/tag.repository.impl';

@Module({})
export class TagModule {
  providers: [
    {
      provide: TagRepository;
      useClass: TagRepositoryImpl;
    },
  ];
}
