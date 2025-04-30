import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface MediaProps extends BaseEntityProps {
  mediaPath: string;
  isThumbnail: boolean;
  articleId?: number | undefined;
}

export class Media extends BaseDomainEntity<MediaProps> {
  protected constructor(props: MediaProps) {
    super(props);
  }

  public static create(props: MediaProps): Media {
    return new Media(props);
  }

  get mediaPath(): string {
    return this.props.mediaPath;
  }

  get isThumbnail(): boolean {
    return this.props.isThumbnail;
  }

  get articleId(): number | undefined {
    return this.props.articleId;
  }
}
