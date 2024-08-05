import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateCreatorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
