import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { ScrapAddedEvent } from './event/scrap-added.event';

export interface ScrapProps extends BaseEntityProps {
  articleId: Identifier;
  userId: Identifier;
}

export class Scrap extends AggregateRoot<ScrapProps> {
  protected constructor(props: ScrapProps) {
    super(props);
  }

  public static create(props: ScrapProps): Scrap {
    const scrap = new Scrap(props);
    scrap.validate();

    scrap.addDomainEvent(new ScrapAddedEvent(props.articleId.value));

    return scrap;
  }

  public validate(): void {
    if (!this.props.articleId || !this.props.userId) {
      throw new Error('게시글ID와 사용자ID는 필수입니다.');
    }
  }

  get articleId(): Identifier {
    return this.props.articleId;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
