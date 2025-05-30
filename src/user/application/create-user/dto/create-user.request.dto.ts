import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Identifier } from 'src/shared/domain/value-object/identifier';
import { Role } from 'src/user/domain/value-object/role.enum';

export class CreateUserRequestDto {
  @Type(() => Identifier)
  @ValidateNested()
  @IsNotEmpty()
  userId: Identifier;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
