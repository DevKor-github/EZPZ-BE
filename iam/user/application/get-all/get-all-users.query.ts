export interface GetAllUsersQuery {
  pageSize: number;
  cursorId?: string;
  cursorDate?: Date;
}
