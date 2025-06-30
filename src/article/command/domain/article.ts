import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';
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
  thumbnailId?: Identifier | null;
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

    if (!this.props.description) {
      throw new Error('설명은 필수입니다.');
    }

    if (!this.props.registrationUrl) {
      throw new Error('등록 URL은 필수입니다.');
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

  get thumbnailId(): Identifier | null {
    return this.props.thumbnailId || null;
  }

  get mediaIds(): Identifier[] {
    return this.props.mediaIds;
  }

  get tags(): Tag[] {
    return this.props.tags;
  }
}
