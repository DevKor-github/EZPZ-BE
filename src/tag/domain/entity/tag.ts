import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface TagProps extends BaseEntityProps {
  name: string;
  articleId?: number;
}

export class Tag extends BaseDomainEntity<TagProps> {
  protected constructor(props: TagProps) {
    super(props);
  }

  public static create(props: TagProps): Tag {
    return new Tag(props);
  }

  get Name(): string {
    return this.props.name;
  }

  get ArticleId(): number | undefined {
    return this.props.articleId;
  }
}
