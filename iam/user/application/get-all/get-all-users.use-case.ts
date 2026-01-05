import { Inject, Injectable } from '@nestjs/common';
import { USER_READER, UserReader } from 'iam/user/domain/user.reader';
import { GetAllUsersQuery } from './get-all-users.query';
import { GetAllUsersResult } from './get-all-users.result';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_READER)
    private readonly userReader: UserReader,
  ) {}

  async execute(query: GetAllUsersQuery): Promise<GetAllUsersResult> {
    const { pageSize, cursorId, cursorDate } = query;
    const userAdminViews = await this.userReader.findAllByCursor(pageSize, cursorId, cursorDate);

    const hasNext = userAdminViews.length > pageSize;

    const users = hasNext ? userAdminViews.slice(0, pageSize) : userAdminViews;

    const lastItem = users[users.length - 1];
    const nextCursorId = hasNext && lastItem ? lastItem.id : null;
    const nextCursorDate = hasNext && lastItem ? lastItem.createdAt : null;

    return {
      users,
      cursorId: nextCursorId,
      cursorDate: nextCursorDate,
      hasNext,
    };
  }
}
