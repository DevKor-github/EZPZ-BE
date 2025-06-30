export class GetArticleDetailProjection {
  id: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  thumbnailPath: string;
  imagePaths: string[];
  scrapCount: number;
  viewCount: number;
  registrationUrl: string;
  //tags: string[];
}
