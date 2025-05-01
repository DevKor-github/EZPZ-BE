import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserScrapRepository } from './domain/repository/user-scrap.repository';

@Module({})
export class UserModule {
  providers: [
    {
      provide: UserRepository;
      useClass: UserRepositoryImpl;
    },
    {
      provide: UserScrapRepository;
      useClass: UserRepositoryImpl;
    },
  ];
}
