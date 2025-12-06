import { ApiProperty } from '@nestjs/swagger';

export class OrganizationView {
  @ApiProperty()
  name: string;

  @ApiProperty()
  contact: string;
}
