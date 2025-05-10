import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface TagProps extends BaseEntityProps {
  name: string;
  articleIds?: Identifier[];
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

  get articleIds(): Identifier[] | undefined {
    return this.props.articleIds;
  }
}
