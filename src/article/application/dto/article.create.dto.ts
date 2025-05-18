export class CreateArticleDto {
  title: string;
  organization: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  registrationUrl: string;
  tags: string[];
}
