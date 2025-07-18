import { BaseDomainEntity, BaseEntityProps } from 'src/shared/core/domain/entity/base.entity';
import { Identifier } from 'src/shared/core/domain/value-object/identifier';

export interface TagProps extends BaseEntityProps {
  name: string;
  articleIds?: Identifier[];
}

export class Tag extends BaseDomainEntity<TagProps> {
  protected constructor(props: TagProps) {
    super(props);
  }

  public static create(props: TagProps): Tag {
    const tag = new Tag(props);
    tag.validate();
    return tag;
  }

  public validate(): void {
    if (!this.props.name) {
      throw new Error('태그 이름은 필수입니다.');
    }
  }

  get name(): string {
    return this.props.name;
  }

  get articleIds(): Identifier[] | undefined {
    return this.props.articleIds;
  }
}
