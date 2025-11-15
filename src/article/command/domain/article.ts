import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';
import { Tag } from 'src/tag/domain/entity/tag';

export interface ArticleProps extends BaseEntityProps {
  title: string;
  organization: string;
  location: string;
  description: string;
  startAt: Date;
  endAt: Date;
  registrationUrl?: string;
  registrationStartAt?: Date;
  registrationEndAt?: Date;
  scrapCount: number;
  viewCount: number;
  mediaIds: Identifier[];
  tags: Tag[];
  organizationId: Identifier;
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
      throw new CustomException(CustomExceptionCode.ARTICLE_TITLE_EMPTY);
    }

    if (!this.props.organization) {
      throw new CustomException(CustomExceptionCode.ARTICLE_ORGANIZATION_EMPTY);
    }

    if (!this.props.location) {
      throw new CustomException(CustomExceptionCode.ARTICLE_LOCATION_EMPTY);
    }

    if (!this.props.startAt) {
      throw new CustomException(CustomExceptionCode.ARTICLE_START_AT_EMPTY);
    }
    if (this.props.startAt > this.props.endAt) {
      throw new CustomException(CustomExceptionCode.ARTICLE_START_AT_EXCEEDS_END_AT);
    }

    if (!this.props.endAt) {
      throw new CustomException(CustomExceptionCode.ARTICLE_END_AT_EMPTY);
    }

    if (this.props.scrapCount < 0) {
      throw new CustomException(CustomExceptionCode.ARTICLE_SCRAP_COUNT_NEGATIVE);
    }
    if (this.props.viewCount < 0) {
      throw new CustomException(CustomExceptionCode.ARTICLE_VIEW_COUNT_NEGATIVE);
    }

    if (this.mediaIds.length > 10) {
      throw new CustomException(CustomExceptionCode.ARTICLE_MEDIA_MAX_IMAGES_EXCEEDED);
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

  get registrationUrl(): string | undefined {
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

  get organizationId(): Identifier {
    return this.props.organizationId;
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
    // Optional date fields: allow explicit clearing when the key is present even if value is undefined
    if (Object.prototype.hasOwnProperty.call(props, 'registrationStartAt')) {
      if (props.registrationStartAt !== this.props.registrationStartAt) {
        this.props.registrationStartAt = props.registrationStartAt;
      }
    }
    if (Object.prototype.hasOwnProperty.call(props, 'registrationEndAt')) {
      if (props.registrationEndAt !== this.props.registrationEndAt) {
        this.props.registrationEndAt = props.registrationEndAt;
      }
    }

    this.props.updatedAt = new Date();
    this.validate();
  }
}
