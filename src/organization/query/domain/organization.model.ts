import { ApiProperty } from '@nestjs/swagger';

export class OrganizationModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  contact: string;
}
