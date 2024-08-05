import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CreatorsModule } from './creators/creators.module';
import { AuthModule } from './auth/auth.module';
import { ContentsModule } from './contents/contents.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root_user:root_pass@localhost:27017',
      {
        dbName: 'gallery',
      }
    ),
    UsersModule,
    CreatorsModule,
    AuthModule,
    ContentsModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
