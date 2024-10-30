import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SetTagsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsArray()
  tags: Array<string>;
}
