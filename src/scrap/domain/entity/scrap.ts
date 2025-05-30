import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface ScrapProps extends BaseEntityProps {
  articleId: Identifier;
  userId: Identifier;
}

export class Scrap extends BaseDomainEntity<ScrapProps> {
  protected constructor(props: ScrapProps) {
    super(props);
  }

  public static create(props: ScrapProps): Scrap {
    return new Scrap(props);
  }

  get articleId(): Identifier {
    return this.props.articleId;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
