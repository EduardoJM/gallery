import * as path from 'path';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Creator, CreatorDocument } from './schemas/creator.schema';
import { CreateCreatorDto, SetCreatorLinksDto } from './dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class CreatorsService {
  private perPage = 10;

  constructor(@InjectModel(Creator.name) private creatorModel: Model<Creator>) {}

  private getTotalCount(user: User): Promise<number> {
    return this.creatorModel.countDocuments({ user }).exec();
  }

  async create(user: User, cover: string, createCreatorDto: CreateCreatorDto): Promise<CreatorDocument> {
    const relativeCover = path.relative(path.resolve(__dirname, '..', '..', '..', '..'), cover);
    const { name } = createCreatorDto;
    const savedCreator = new this.creatorModel({ name, user, cover: relativeCover, links: [] });
    return savedCreator.save();
  }

  async list(user: User, page: number = 1) {
    const total = await this.getTotalCount(user);
    const galleries = await this.creatorModel
      .find({ user }, ['name', 'links'], {
        skip: (page - 1) * this.perPage,
        limit: this.perPage
      })
      .exec();

    return {
      'results': galleries,
      'meta': {
        'total': total,
        'page': page,
        'pages': Math.ceil(total / this.perPage),
      }
    }
  }

  async findById(user: User, id: string) {
    return this.creatorModel.findOne({ user, _id: id }).exec();
  }

  async setLinks(user: User, id: string, setCreatorLinksDto: SetCreatorLinksDto) {
    const creator = await this.findById(user, id);
    creator.links = setCreatorLinksDto.links;
    return creator.save();
  }
}
