import { BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface MediaProps extends BaseEntityProps {
  mediaPath: string;
  isThumbnail: boolean;
  articleId?: number;
}

export class Media {
  private readonly props: MediaProps;

  constructor(props: MediaProps) {
    this.props = props;
  }

  get MediaPath(): string {
    return this.props.mediaPath;
  }

  get isThumbnail(): boolean {
    return this.props.isThumbnail;
  }

  get ArticleId(): number | undefined {
    return this.props.articleId;
  }
}
