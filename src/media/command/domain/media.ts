import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/entity/base.entity';
import { Identifier } from 'src/shared/core/domain/value-object/identifier';

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
      throw new Error('미디어 경로는 필수입니다.');
    }
    if (!this.validateMediaPath()) {
      throw new Error('유효하지 않은 미디어 경로입니다.');
    }

    if (this.props.order === undefined) {
      throw new Error('이미지 순서는 필수입니다.');
    }

    if (!this.props.articleId) {
      throw new Error('articleId는 필수입니다.');
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
