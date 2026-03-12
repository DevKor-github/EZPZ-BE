import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_READER, UserReader } from 'src/iam/user/domain/user.reader';
import { GetUserQuery } from './get-user.query';
import { GetUserResult } from './get-user.result';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_READER)
    private readonly userReader: UserReader,
  ) {}

  async execute(query: GetUserQuery): Promise<GetUserResult> {
    const { userId } = query;
    const user = await this.userReader.findById(userId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    return { email: user.email };
  }
}
