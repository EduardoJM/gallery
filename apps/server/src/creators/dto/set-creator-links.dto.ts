import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested, IsUrl, IsString } from 'class-validator';

export class CreatorLink {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  icon: string;
  
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  link: string;
}

export class SetCreatorLinksDto {
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CreatorLink)
  @ApiProperty()
  links: CreatorLink[];
}
