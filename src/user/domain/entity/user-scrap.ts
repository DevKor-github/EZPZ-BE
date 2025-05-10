import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/entity/base.entity';
import { Identifier } from 'src/shared/domain/value-object/identifier';

export interface UserScrapProps extends BaseEntityProps {
  articleId: Identifier;
  userId: Identifier;
}

export class UserScrap extends BaseDomainEntity<UserScrapProps> {
  protected constructor(props: UserScrapProps) {
    super(props);
  }

  public static create(props: UserScrapProps): UserScrap {
    return new UserScrap(props);
  }

  get articleId(): Identifier {
    return this.props.articleId;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
