import { Module } from '@nestjs/common';
import { UserCommandModule } from './command/user.command.module';
import { UserQueryModule } from './query/user.query.module';

@Module({
  imports: [UserCommandModule, UserQueryModule],
})
export class UserModule {}
