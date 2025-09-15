import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export interface MediaProps extends BaseEntityProps {
  mediaPath: string;
  order: number;
  articleId?: Identifier | undefined;
}

export class Media extends BaseDomainEntity<MediaProps> {
  protected constructor(props: MediaProps) {
    super(props);
  }

  public static create(props: MediaProps): Media {
    const media = new Media(props);
    media.validate();

    return media;
  }

  public validate(): void {
    if (!this.props.mediaPath) {
      throw new CustomException(CustomExceptionCode.MEDIA_PATH_EMPTY);
    }
    if (!this.validateMediaPath()) {
      throw new CustomException(CustomExceptionCode.MEDIA_INVALID_PATH);
    }

    if (this.props.order === undefined) {
      throw new CustomException(CustomExceptionCode.MEDIA_ORDER_EMPTY);
    }

    if (!this.props.articleId) {
      throw new CustomException(CustomExceptionCode.MEDIA_ARTICLE_ID_EMPTY);
    }
  }

  private validateMediaPath(): boolean {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'img'].join('|');
    const pattern = new RegExp(`^https://[^/]+/images/[^/]+/[^/]+\\.(${allowedExtensions})$`);

    return pattern.test(this.props.mediaPath);
  }

  get mediaPath(): string {
    return this.props.mediaPath;
  }

  get order(): number {
    return this.props.order;
  }

  get articleId(): Identifier | undefined {
    return this.props.articleId;
  }
}
