import * as multer from 'multer';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatorsController } from './creators.controllers';
import { UsersModule } from '../users/users.module';
import { CreatorsService } from './creators.service';
import { Creator, CreatorSchema } from './schemas/creator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Creator.name,
        schema: CreatorSchema,
      }
    ]),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '..', '..', '..', '..', 'bucket/photos/covers'));
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now().toString() + Math.round(Math.random() * 1E9).toString()
          const extension = file.originalname.split('.').pop()
          cb(null, uniqueSuffix + '.' + extension)
        }
      }),
    }),
    UsersModule,
  ],
  controllers: [CreatorsController],
  providers: [CreatorsService],
  exports: [CreatorsService],
})
export class CreatorsModule {}
