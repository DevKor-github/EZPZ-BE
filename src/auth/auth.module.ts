import { Module } from '@nestjs/common';
import { AuthRepository } from './domain/repository/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/repository/auth.repository.impl';

@Module({})
export class AuthModule {
  providers: [
    {
      provide: AuthRepository;
      useClass: AuthRepositoryImpl;
    },
  ];
}
