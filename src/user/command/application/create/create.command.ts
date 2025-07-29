import { ICommand } from '@nestjs/cqrs';
import { Role } from '../../domain/value-object/role.enum';
import { Identifier } from 'src/shared/core/domain/identifier';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userId: Identifier,
    public readonly email: string,
    public readonly role: Role,
  ) {}
}
