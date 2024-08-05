import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto } from './dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class AuthService {
  private saltRounds = 10;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mediaService: MediaService,
  ) {}

  private async generateSalt(): Promise<string> {
    return bcrypt.genSalt(this.saltRounds);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(user: UserDocument): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email, true);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!this.comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }
    const token = await this.generateToken(user);
    const mediaToken = await this.mediaService.generateMediaToken(user);
    return new SignInResponseDto(user, token, mediaToken);
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    const { email, name, password } = signUpDto;
    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersService.create(email, name, hashedPassword);
    const token = await this.generateToken(user);
    const mediaToken = await this.mediaService.generateMediaToken(user);
    return new SignUpResponseDto(user, token, mediaToken);
  };
}
