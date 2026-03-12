import { UserAdminView } from 'src/iam/user/domain/user.admin.view';

export class GetAllUsersResult {
  users: UserAdminView[];
  cursorId: string | null;
  cursorDate: string | null;
  hasNext: boolean;
}
