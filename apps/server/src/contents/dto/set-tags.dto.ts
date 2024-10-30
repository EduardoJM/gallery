import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SetTagsDto {
  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  tags: Array<string>;
}
