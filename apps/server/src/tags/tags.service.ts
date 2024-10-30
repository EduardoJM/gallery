import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tags.schema';

@Injectable()
export class TagsService {
  private perPage = 10;

  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  private getTotalCount(userId: string, creatorId: string): Promise<number> {
    return this.tagModel.countDocuments({ userId, creatorId }).exec();
  }

  async listByUserAndCreator(userId: string, creatorId: string, page: number = 1) {
    const total = await this.getTotalCount(userId, creatorId);
    const tags = await this.tagModel
      .find({ userId, creatorId }, ['userId', 'creatorId', 'name'], {
        skip: (page - 1) * this.perPage,
        limit: this.perPage
      })
      .exec();
    
    return {
      'results': tags,
      'meta': {
        'total': total,
        'page': page,
        'pages': Math.ceil(total / this.perPage),
      }
    }
  }

  async createTag(userId: string, name: string) {
    const doc = await this.tagModel.findOne({ userId, name }).exec();
    if (doc) {
      return doc;
    }
    const savedTag = new this.tagModel({ name, userId });
    return savedTag.save();
  }
}
