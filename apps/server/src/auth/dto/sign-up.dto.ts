import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../../users/schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;

  @ApiProperty()
  mediaToken: string;

  constructor(user: User, token: string, mediaToken: string) {
    this.user = user;
    this.token = token;
    this.mediaToken = mediaToken;
  }
}
