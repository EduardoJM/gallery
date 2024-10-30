import * as path from 'path';
import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Content, ContentType } from './schemas/content.schema';
import { User } from 'src/users/schemas/user.schema';
import { Creator } from 'src/creators/schemas/creator.schema';
import { CreatorsService } from 'src/creators/creators.service';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ContentsService {
  private perPage = 16;
  
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectModel(Creator.name) private creatorModel: Model<Creator>,
    private creatorsService: CreatorsService,
    private tagsService: TagsService,
  ) {}

  private getTotalCount(user: User, creator?: Creator): Promise<number> {
    let data: FilterQuery<Content> = { user };
    if (creator) {
      data = { ...data, creator };
    }

    return this.contentModel.countDocuments(data).exec();
  }

  async list(
    user: User,
    creatorId?: string | null,
    page: number = 1,
    mediaType?: string | null,
  ) {
    let data: FilterQuery<Content> = { user };
    let creator: Creator | null = null;

    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
      if (creator) {
        data = { ...data, creator };
      }
    }
    if (mediaType) {
      data = { ...data, type: mediaType }
    }
    const total = await this.getTotalCount(user, creator);

    const contents = await this.contentModel
      .find(data, ['_id', 'creator', 'type', 'createdAt', 'updatedAt'], {
        skip: (page - 1) * this.perPage,
        limit: this.perPage,
        sort: { _id: -1 },
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

  async getNextInList(user: User, currentId: string, creatorId?: string | null) {
    let data: FilterQuery<Content> = {
      _id: { $lt: new Types.ObjectId(currentId) },
      user
    };
    let creator: Creator | null = null;

    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
      if (creator) {
        data = { ...data, creator };
      }
    }
    
    const contents = await this.contentModel
      .find(data, ['_id'], {
        sort: { _id: -1 },
        limit: 1,
      })
    
    if (!contents.length) {
      throw new NotFoundException();
    }
    return { id: contents[0].id };
  }

  async getPreviousInList(user: User, currentId: string, creatorId?: string | null) {
    let data: FilterQuery<Content> = {
      _id: { $gt: new Types.ObjectId(currentId) },
      user
    };
    let creator: Creator | null = null;

    if (creatorId) {
      creator = await this.creatorsService.findById(user, creatorId);
      if (creator) {
        data = { ...data, creator };
      }
    }
    
    const contents = await this.contentModel
      .find(data, ['_id'], {
        limit: 1,
      })
    
    if (!contents.length) {
      throw new NotFoundException();
    }
    return { id: contents[0].id };
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

  async setTags(user: User, contentId: string, tags: string[]) {
    const doc = await this.findById(user, contentId);
    await Promise.all(
      tags.map((tag) => this.tagsService.createTag(user.id, doc.creator.id, tag))
    )
    doc.tags = tags;
    return doc.save();
  }
}
