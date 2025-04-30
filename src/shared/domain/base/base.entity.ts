export interface BaseEntityProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity {
  private readonly props: BaseEntityProps;

  constructor(props: BaseEntityProps) {
    this.props = props;
  }

  get Id(): number {
    return this.props.id;
  }

  get CreatedAt(): Date {
    return this.props.createdAt;
  }

  get UpdatedAt(): Date {
    return this.props.updatedAt;
  }
}
