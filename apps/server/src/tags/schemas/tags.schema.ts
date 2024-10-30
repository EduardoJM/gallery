import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, now } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

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
export class Tag {
  @ApiProperty({ readOnly: true })
  id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  userId: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  creatorId: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
