export interface BaseEntityProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseDomainEntity<Props extends BaseEntityProps> {
  protected props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  get id(): number {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
