import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CreatorDocument = HydratedDocument<Creator>;

export class CreatorLink {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  icon: string;

  @ApiProperty()
  @Prop()
  link: string;
}

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.user;
    },
  }
})
export class Creator {
  @ApiProperty({ readOnly: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', select: false })
  user: User;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop()
  cover: string;

  @ApiProperty()
  @Prop([CreatorLink])
  links: CreatorLink[]
}

export const CreatorSchema = SchemaFactory.createForClass(Creator);
