import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, now } from 'mongoose';
import { Creator } from 'src/creators/schemas/creator.schema';
import { User } from 'src/users/schemas/user.schema';

export type ContentDocument = HydratedDocument<Content>;

export enum ContentType {
    Photo = 'Photo',
    Video = 'Video',
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.user;
    },
  }
})
export class Content {
  @ApiProperty({ readOnly: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Creator' })
  creator: Creator;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    enum: [ContentType.Photo, ContentType.Video]
  })
  type: string;

  @ApiProperty()
  @Prop({ required: true })
  file: string;

  @Prop({ type: [String], required: false })
  tags: Array<string>;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
