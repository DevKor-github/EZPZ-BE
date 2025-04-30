import { BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface TagProps extends BaseEntityProps {
  name: string;
  articleId?: number;
}

export class Tag {
  private readonly props: TagProps;

  constructor(props: TagProps) {
    this.props = props;
  }

  get Name(): string {
    return this.props.name;
  }

  get ArticleId(): number | undefined {
    return this.props.articleId;
  }
}
