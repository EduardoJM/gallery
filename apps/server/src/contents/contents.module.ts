import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { Content, ContentSchema } from './schemas/content.schema';
import { UsersModule } from 'src/users/users.module';
import { CreatorsModule } from 'src/creators/creators.module';
import { Creator, CreatorSchema } from 'src/creators/schemas/creator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: ContentSchema,
      },
      {
        name: Creator.name,
        schema: CreatorSchema,
      }
    ]),
    UsersModule,
    CreatorsModule,
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
