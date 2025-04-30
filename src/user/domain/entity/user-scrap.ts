import { BaseEntityProps } from 'src/shared/domain/base/base.entity';

export interface UserScrapProps extends BaseEntityProps {
  articleId: number;
  userId: number;
}

export class UserScrap {
  private readonly props: UserScrapProps;

  constructor(props: UserScrapProps) {
    this.props = props;
  }

  get ArticleId(): number {
    return this.props.articleId;
  }

  get UserId(): number {
    return this.props.userId;
  }
}
