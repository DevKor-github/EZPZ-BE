import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface TagProps extends BaseEntityProps {
  name: string;
  articleIds?: number[];
}

export class Tag extends BaseDomainEntity<TagProps> {
  protected constructor(props: TagProps) {
    super(props);
  }

  public static create(props: TagProps): Tag {
    return new Tag(props);
  }

  get name(): string {
    return this.props.name;
  }

  get articleIds(): number[] | undefined {
    return this.props.articleIds;
  }
}
