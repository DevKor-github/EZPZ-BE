import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

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
    return new Media(props);
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
