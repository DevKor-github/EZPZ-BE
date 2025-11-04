import { AggregateRoot } from 'src/shared/core/domain/base.aggregate';
import { BaseEntityProps } from 'src/shared/core/domain/base.entity';
import { CustomException } from 'src/shared/exception/custom-exception';
import { CustomExceptionCode } from 'src/shared/exception/custom-exception-code';

export interface OrganizationProps extends BaseEntityProps {
  name: string;
  contact: string;
}

export class Organization extends AggregateRoot<OrganizationProps> {
  protected constructor(props: OrganizationProps) {
    super(props);
  }

  public static create(props: OrganizationProps): Organization {
    const organization = new Organization(props);
    organization.validate();

    return organization;
  }

  public static of(props: OrganizationProps): Organization {
    return new Organization(props);
  }

  public validate(): void {
    if (this.props.name.length < 1 || this.props.name.length > 63) {
      throw new CustomException(CustomExceptionCode.ORGANIZATION_INVALID_NAME_LENGTH);
    }

    if (!/^010-\d{4}-\d{4}$/.test(this.props.contact)) {
      throw new CustomException(CustomExceptionCode.ORGANIZATION_INVALID_CONTACT_FORMAT);
    }
  }

  public update(name: string | null, contact: string | null): void {
    if (name) this.props.name = name;
    if (contact) this.props.contact = contact;
    this.props.updatedAt = new Date();

    this.validate();
  }

  get name(): string {
    return this.props.name;
  }

  get contact(): string {
    return this.props.contact;
  }
}
