import { BaseEntity } from 'src/shared/infrastructure/orm-entity/base.entity';

export interface ArticleProps extends BaseEntity {
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
  tagIds: number[];
}

export class Article {
  private readonly props: ArticleProps;

  private constructor(props: ArticleProps) {
    this.props = props;
  }

  get Title(): string {
    return this.props.title;
  }

  get Organization(): string {
    return this.props.organization;
  }

  get Location(): string {
    return this.props.location;
  }

  get Description(): string {
    return this.props.description;
  }

  get RegistrationUrl(): string {
    return this.props.registrationUrl;
  }

  get StartAt(): Date {
    return this.props.startAt;
  }

  get EndAt(): Date {
    return this.props.endAt;
  }

  get ScrapCount(): number {
    return this.props.scrapCount;
  }

  get ViewCount(): number {
    return this.props.viewCount;
  }

  get MediaIds(): number[] {
    return this.props.mediaIds;
  }

  get TagIds(): number[] {
    return this.props.tagIds;
  }
}
