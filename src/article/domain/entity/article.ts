import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';
import { Tag } from 'src/tag/domain/entity/tag';

export interface ArticleProps extends BaseEntityProps {
  title: string;
  organization: string;
  location: string;
  description: string;
  registrationUrl: string;
  startAt: Date;
  endAt: Date;
  scrapCount: number;
  viewCount: number;
  mediaIds: number[];
  tags: Tag[];
}

export class Article extends BaseDomainEntity<ArticleProps> {
  constructor(props: ArticleProps) {
    super(props);
  }

  get title(): string {
    return this.props.title;
  }

  get organization(): string {
    return this.props.organization;
  }

  get location(): string {
    return this.props.location;
  }

  get description(): string {
    return this.props.description;
  }

  get registrationUrl(): string {
    return this.props.registrationUrl;
  }

  get startAt(): Date {
    return this.props.startAt;
  }

  get endAt(): Date {
    return this.props.endAt;
  }

  get scrapCount(): number {
    return this.props.scrapCount;
  }

  get viewCount(): number {
    return this.props.viewCount;
  }

  get mediaIds(): number[] {
    return this.props.mediaIds;
  }

  get tags(): Tag[] {
    return this.props.tags;
  }

  public static create(props: ArticleProps): Article {
    return new Article(props);
  }
}
