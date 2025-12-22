export class GetArticleSummariesQuery {
  constructor(
    public readonly pageSize: number,
    public readonly cursorId?: string,
    public readonly cursorDate?: Date,
  ) {}
}
