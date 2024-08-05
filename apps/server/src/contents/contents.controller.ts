import * as multer from 'multer';
import * as path from 'path';
import { Controller, UseGuards, Request, Get, Post, ParseIntPipe, Query, UseInterceptors, Body, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContentsService } from './contents.service';
import { User } from 'src/users/schemas/user.schema';
import { CreatePhotoDto } from './dto';

@ApiTags('contents')
@Controller('contents')
@UseGuards(AuthGuard)
export class ContentsController {
  constructor(private contentsService: ContentsService) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', '..', '..', 'bucket/photos/files'));
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now().toString() + Math.round(Math.random() * 1E9).toString()
        const extension = file.originalname.split('.').pop()
        cb(null, uniqueSuffix + '.' + extension)
      }
    }),
  }))
  async createPhoto(
    @Request() request,
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg|image/png|image/jpg|image/gif' }),
        ]
      }),
    ) file: Express.Multer.File,
  ) {
    const user = request.user as User;
    return this.contentsService.createPhoto(user, file.path, createPhotoDto.creator);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', '..', '..', '/bucket/videos/files'));
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now().toString() + Math.round(Math.random() * 1E9).toString()
        const extension = file.originalname.split('.').pop()
        cb(null, uniqueSuffix + '.' + extension)
      }
    }),
  }))
  async createVideo(
    @Request() request,
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'video/mp4' }),
        ]
      }),
    ) file: Express.Multer.File,
  ) {
    const user = request.user as User;
    return this.contentsService.createVideo(user, file.path, createPhotoDto.creator);
  }

  @Get('')
  async list(
    @Request() request,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ) {
    const user = request.user as User;
    return this.contentsService.list(user, null, page)
  }

  @Get(':id')
  async findById(
    @Request() request,
    @Param('id') id: string,
  ) {
    const user = request.user as User;
    return this.contentsService.findById(user, id);
  }
}
