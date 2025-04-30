import { BaseDomainEntity, BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface UserScrapProps extends BaseEntityProps {
  articleId: number;
  userId: number;
}

export class UserScrap extends BaseDomainEntity<UserScrapProps> {
  protected constructor(props: UserScrapProps) {
    super(props);
  }

  public static create(props: UserScrapProps): UserScrap {
    return new UserScrap(props);
  }

  get ArticleId(): number {
    return this.props.articleId;
  }

  get UserId(): number {
    return this.props.userId;
  }
}
