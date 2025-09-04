import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { Tag } from 'src/tag/domain/entity/tag';

export interface ArticleProps extends BaseEntityProps {
  title: string;
  organization: string;
  location: string;
  description: string;
  registrationUrl: string;
  startAt: Date;
  endAt: Date;
  registrationStartAt?: Date;
  registrationEndAt?: Date;
  scrapCount: number;
  viewCount: number;
  mediaIds: Identifier[];
  tags: Tag[];
}

export class Article extends BaseDomainEntity<ArticleProps> {
  constructor(props: ArticleProps) {
    super(props);
  }

  public static create(props: ArticleProps): Article {
    const article = new Article(props);
    article.validate();

    return article;
  }

  public validate(): void {
    if (!this.props.title) {
      throw new Error('제목은 필수입니다.');
    }

    if (!this.props.organization) {
      throw new Error('조직은 필수입니다.');
    }

    if (!this.props.location) {
      throw new Error('위치는 필수입니다.');
    }

    if (!this.props.startAt) {
      throw new Error('시작 날짜는 필수입니다.');
    }
    if (this.props.startAt > this.props.endAt) {
      throw new Error('시작 날짜는 종료 날짜보다 이전이어야 합니다.');
    }

    if (!this.props.endAt) {
      throw new Error('종료 날짜는 필수입니다.');
    }

    if (this.props.scrapCount < 0) {
      throw new Error('스크랩 수는 0 이상이어야 합니다.');
    }
    if (this.props.viewCount < 0) {
      throw new Error('조회 수는 0 이상이어야 합니다.');
    }

    if (this.mediaIds.length > 10) {
      throw new Error('이미지는 최대 10개까지 업로드할 수 있습니다.');
    }
  }

  increaseScrapCount(): void {
    this.props.scrapCount += 1;
    this.props.updatedAt = new Date();
  }

  decreaseScrapCount(): void {
    if (this.props.scrapCount > 0) {
      this.props.scrapCount -= 1;
      this.props.updatedAt = new Date();
    }
  }

  setTags(tags: Tag[]): void {
    this.props.tags = tags;
    this.props.updatedAt = new Date();
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

  get registrationStartAt(): Date | undefined {
    return this.props.registrationStartAt;
  }

  get registrationEndAt(): Date | undefined {
    return this.props.registrationEndAt;
  }

  get scrapCount(): number {
    return this.props.scrapCount;
  }

  get viewCount(): number {
    return this.props.viewCount;
  }

  get mediaIds(): Identifier[] {
    return this.props.mediaIds;
  }

  get tags(): Tag[] {
    return this.props.tags;
  }

  public update(props: {
    title?: string;
    organization?: string;
    location?: string;
    description?: string;
    registrationUrl?: string;
    startAt?: Date;
    endAt?: Date;
    registrationStartAt?: Date;
    registrationEndAt?: Date;
  }): void {
    if (props.title !== undefined && props.title !== this.props.title) {
      this.props.title = props.title;
    }
    if (props.organization !== undefined && props.organization !== this.props.organization) {
      this.props.organization = props.organization;
    }
    if (props.location !== undefined && props.location !== this.props.location) {
      this.props.location = props.location;
    }
    if (props.description !== undefined && props.description !== this.props.description) {
      this.props.description = props.description;
    }
    if (props.registrationUrl !== undefined && props.registrationUrl !== this.props.registrationUrl) {
      this.props.registrationUrl = props.registrationUrl;
    }
    if (props.startAt !== undefined && props.startAt !== this.props.startAt) {
      this.props.startAt = props.startAt;
    }
    if (props.endAt !== undefined && props.endAt !== this.props.endAt) {
      this.props.endAt = props.endAt;
    }
    if (props.registrationStartAt !== undefined && props.registrationStartAt !== this.props.registrationStartAt) {
      this.props.registrationStartAt = props.registrationStartAt;
    }
    if (props.registrationEndAt !== undefined && props.registrationEndAt !== this.props.registrationEndAt) {
      this.props.registrationEndAt = props.registrationEndAt;
    }

    this.props.updatedAt = new Date();
    this.validate();
  }
}
