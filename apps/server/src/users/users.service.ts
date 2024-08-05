import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string, withPassword: boolean = false): Promise<UserDocument | null> {
    let query = this.userModel.findOne({ email })
    if (withPassword) {
      query = query.select(['password', 'email', 'name']);
    }
    
    return query.exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(email: string, name: string, password: string): Promise<UserDocument> {
    const userWithEmail = await this.findByEmail(email);
    if (userWithEmail) {
      throw new HttpException({
        message: ['this e-mail is already taken'],
      }, HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel({ email, name, password });
    return createdUser.save();
  }
}
