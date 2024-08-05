import * as path from 'path';
import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentType } from './schemas/content.schema';
import { User } from 'src/users/schemas/user.schema';
import { Creator } from 'src/creators/schemas/creator.schema';
import { CreatorsService } from 'src/creators/creators.service';

@Injectable()
export class ContentsService {
  private perPage = 10;
  
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectModel(Creator.name) private creatorModel: Model<Creator>,
    private creatorsService: CreatorsService,
  ) {}

  private getTotalCount(user: User, creator?: Creator): Promise<number> {
    let data: FilterQuery<Content> = { user };
    if (creator) {
      data = { ...data, creator };
    }

    return this.contentModel.countDocuments(data).exec();
  }

  async list(user: User, creatorId?: string | null, page: number = 1) {
    let data: FilterQuery<Content> = { user };
    let creator: Creator | null = null;

    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
      if (creator) {
        data = { ...data, creator };
      }
    }
    const total = await this.getTotalCount(user, creator);

    const contents = await this.contentModel
      .find(data, ['creator', 'type', 'createdAt', 'updatedAt'], {
        skip: (page - 1) * this.perPage,
        limit: this.perPage
      })
      .populate({
        path: 'creator',
        model: this.creatorModel,
      })
      .exec();

    return {
      'results': contents,
      'meta': {
        'total': total,
        'page': page,
        'pages': Math.ceil(total / this.perPage),
      }
    }
  }

  async findById(user: User, id: string) {
    return this.contentModel
      .findOne({ user, _id: id })
      .populate({
        path: 'creator',
        model: this.creatorModel,
      })
      .exec();
  }

  async createPhoto(user: User, file: string, creatorId?: string | null) {
    let creator: Creator | null = null;
    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
    }

    const relativeFile = path.relative(path.resolve(__dirname, '..', '..', '..', '..'), file);
    const createdContent = new this.contentModel({
      user,
      creator,
      file: relativeFile,
      type: ContentType.Photo,
    });
    return createdContent.save();
  }

  async createVideo(user: User, file: string, creatorId?: string | null) {
    let creator: Creator | null = null;
    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
    }

    const relativeFile = path.relative(path.resolve(__dirname, '..', '..', '..', '..'), file);
    const createdContent = new this.contentModel({
      user,
      creator,
      file: relativeFile,
      type: ContentType.Video,
    });
    return createdContent.save();
  }
}
