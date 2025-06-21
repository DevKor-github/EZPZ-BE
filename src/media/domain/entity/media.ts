import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface MediaProps extends BaseEntityProps {
  mediaPath: string;
  isThumbnail: boolean;
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
      throw new Error('미디어 경로는 필수입니다.');
    }
    if (!this.validateMediaPath()) {
      throw new Error('유효하지 않은 미디어 경로입니다.');
    }

    if (!this.props.isThumbnail) {
      throw new Error('isThumbnail은 필수입니다.');
    }

    if (!this.props.articleId) {
      throw new Error('articleId는 필수입니다.');
    }
    if (this.props.articleId instanceof Identifier) {
      throw new Error('articleId는 Identifier 타입이어야 합니다.');
    }
  }

  private validateMediaPath(): boolean {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'img'].join('|');
    const pattern = new RegExp(`^/images/[^/]+/[^/]+\\.(${allowedExtensions})$`);

    return pattern.test(this.props.mediaPath);
  }

  get mediaPath(): string {
    return this.props.mediaPath;
  }

  get isThumbnail(): boolean {
    return this.props.isThumbnail;
  }

  get articleId(): Identifier | undefined {
    return this.props.articleId;
  }
}
