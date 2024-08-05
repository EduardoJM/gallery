import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../users/schemas/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SignUpResponseDto })
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  };

  @Post('sign-in')
  @ApiOkResponse({ type: SignInResponseDto })
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  };

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({ type: User })
  getProfile(@Request() req): User {
    return req.user;
  }
}
