export class GetMyScrapQuery {
  constructor(
    public readonly userId: string,
    public readonly tags: string[] | undefined,
    public readonly isFinished?: boolean,
    public readonly sortBy?: 'createdAt' | 'scrapCount' | 'viewCount' | undefined,
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}
