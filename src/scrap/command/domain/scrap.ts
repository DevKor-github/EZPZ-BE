import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { Identifier } from 'src/shared/core/domain/identifier';
import { ScrapAddedEvent } from './event/scrap-added.event';
import { ScrapDeletedEvent } from './event/scrap-deleted.event';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

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
      throw new CustomException(CustomExceptionCode.SCRAP_ARTICLE_ID_OR_USER_ID_EMPTY);
    }
  }

  public delete(): void {
    this.addDomainEvent(new ScrapDeletedEvent(this.articleId.value));
  }

  get articleId(): Identifier {
    return this.props.articleId;
  }

  get userId(): Identifier {
    return this.props.userId;
  }
}
