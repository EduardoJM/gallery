import { Controller, UseGuards, Get, Request, Param, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { MediaAuthGuard } from './media-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { MediaService } from './media.service';

@UseGuards(MediaAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get('creators/:id/cover')
  async getCoverImage(
    @Request() request,
    @Response() response: ExpressResponse,
    @Param('id') id: string,
  ) {
    const user = request.user as User;
    const coverStream = await this.mediaService.getCoverFile(user, id);
    if (!coverStream) {
      throw new Error('');
    }
    const { stream, mimeType } = coverStream;
    this.mediaService.streamToResponse(mimeType, stream, response);
  }

  @Get('content/:id/photo')
  async getContentPhoto(
    @Request() request,
    @Response() response: ExpressResponse,
    @Param('id') id: string,
  ) {
    const user = request.user as User;
    const contentStream = await this.mediaService.getContentImage(user, id);
    if (!contentStream) {
      throw new Error('');
    }
    const { stream, mimeType } = contentStream;
    this.mediaService.streamToResponse(mimeType, stream, response);
  }

  @Get('content/:id/video')
  async getContentVideo(
    @Request() request,
    @Response() response: ExpressResponse,
    @Param('id') id: string,
  ) {
    const user = request.user as User;
    const contentStream = await this.mediaService.getContentVideo(user, id);
    if (!contentStream) {
      throw new Error('');
    }
    const { stream, mimeType } = contentStream;
    this.mediaService.streamToResponse(mimeType, stream, response);
  }

  @Get('content/:id/thumb')
  async getContentThumb(
    @Request() request,
    @Response() response: ExpressResponse,
    @Param('id') id: string,
  ) {
    const user = request.user as User;
    const contentStream = await this.mediaService.getContentThumb(user, id);
    if (!contentStream) {
      throw new Error('');
    }
    const { stream, mimeType } = contentStream;
    this.mediaService.streamToResponse(mimeType, stream, response);
  }
}
