import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChangeCreatorDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name?: string;
}
