export interface ArticleDetailDto {
  id: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  thumbnail_path: string;
  imagePaths: string[];
  scrapCount: number;
  viewCount: number;
  registrationUrl: string;
  tags: string[];
}
