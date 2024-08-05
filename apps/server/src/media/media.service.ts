import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import * as ffmpeg from "fluent-ffmpeg";
import * as ffmpeg_static from "ffmpeg-static";
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { CreatorsService } from 'src/creators/creators.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ContentsService } from 'src/contents/contents.service';
import { Content, ContentType } from 'src/contents/schemas/content.schema';

@Injectable()
export class MediaService {
  private IMAGE_MIME_TYPES = {
    gif: "image/gif",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
  };

  private VIDEO_MIME_TYPES = {
    mp4: "video/mp4",
  };

  private defaultThumbnailPath = null;

  constructor(
    private creatorsService: CreatorsService,
    private contentsService: ContentsService,
    private jwtService: JwtService,
  ) {}

  generateMediaToken(user: UserDocument): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id });
  }
  
  private getMimeTypeFromImageFile(filePath: string) {
    const ext = path.extname(filePath).slice(1);
    if (!Object.prototype.hasOwnProperty.call(this.IMAGE_MIME_TYPES, ext)) {
      //throw new ContentUnsupportedException();
      throw new Error('');
    }
    return String((this.IMAGE_MIME_TYPES as any)[ext]);
  }

  private getMimeTypeFromVideoFile(filePath: string) {
    const ext = path.extname(filePath).slice(1);
    if (!Object.prototype.hasOwnProperty.call(this.VIDEO_MIME_TYPES, ext)) {
      //throw new ContentUnsupportedException();
      throw new Error('');
    }
    return String((this.VIDEO_MIME_TYPES as any)[ext]);
  }

  private getBucketFilePath(pathToFile: string): string {
    return path.join(__dirname, '..', '..', '..', '..', pathToFile);
  }

  async getCoverFile(user: User, id: string) {
    const creator = await this.creatorsService.findById(user, id);
    if (!creator) {
      return null;
    }
    const { cover } = creator;
    const mimeType = this.getMimeTypeFromImageFile(cover);
    return {
      mimeType,
      stream: fs.createReadStream(this.getBucketFilePath(cover)),
    };
  }

  async getContentImage(user: User, id: string) {
    const content = await this.contentsService.findById(user, id);
    if (!content) {
      return null;
    }
    if (content.type !== ContentType.Photo) {
      return null;
    }
    const { file } = content;
    const mimeType = this.getMimeTypeFromImageFile(file);
    return {
      mimeType,
      stream: fs.createReadStream(this.getBucketFilePath(file)),
    };
  }

  async getContentVideo(user: User, id: string) {
    const content = await this.contentsService.findById(user, id);
    if (!content) {
      return null;
    }
    if (content.type !== ContentType.Video) {
      return null;
    }
    const { file } = content;
    const mimeType = this.getMimeTypeFromVideoFile(file);
    return {
      mimeType,
      stream: fs.createReadStream(this.getBucketFilePath(file)),
    };
  }

  streamToResponse(mimeType: string, stream: fs.ReadStream, response: Response) {
    stream.on("open", function () {
      response.set("Content-Type", mimeType);
      stream.pipe(response);
    });
    stream.on("error", function () {
      response.set("Content-Type", "text/plain");
      response.status(404).end("Not found");
    });
  }

  private async createPhotoThumbnail(rawImagePath: string, destImagePath: string): Promise<string> {
    const destBucketPath = this.getBucketFilePath(destImagePath);

    if (fs.existsSync(destBucketPath)) {
      return destBucketPath;
    }

    return new Promise<string>((resolve, reject) => {
      sharp(this.getBucketFilePath(rawImagePath))
        .resize(400)
        .toFile(destBucketPath, (err) => {
          if (err) {
            reject(err);
          }
          resolve(destBucketPath);
        });
    });
  }

  private async createVideoThumbnail(rawImagePath: string, destImagePath: string) {
    const destBucketPath = this.getBucketFilePath(destImagePath);

    if (fs.existsSync(destBucketPath)) {
      return destBucketPath;
    }

    const fileName = path.basename(destBucketPath);
    const dir = path.dirname(destBucketPath);
  
    return new Promise<string | null>((resolve) => {
      if (!ffmpeg_static) {
        console.log("ffmpeg not found");
        return resolve(this.defaultThumbnailPath);
      }
  
      ffmpeg(this.getBucketFilePath(rawImagePath))
        .setFfmpegPath(ffmpeg_static)
        .screenshots({
          timestamps: [0.0],
          filename: fileName,
          size: "400x?",
          folder: dir,
        })
        .on("end", function () {
          resolve(destBucketPath);
        });
    });
  }

  private async getContentImageThumb(content: Content) {
    if (content.type !== ContentType.Photo) {
      return null;
    }
    const { file } = content;
    
    const rawFileName = file.split('/').pop()
    const thumbPath = `./bucket/photos/thumbs/${rawFileName}`;
    const savedThumbPath = await this.createPhotoThumbnail(file, thumbPath);
    
    const mimeType = this.getMimeTypeFromImageFile(savedThumbPath);
    return {
      mimeType,
      stream: fs.createReadStream(savedThumbPath),
    };
  }

  private async getContentVideoThumb(content: Content) {
    if (content.type !== ContentType.Video) {
      return null;
    }
    const { file } = content;
    
    const rawFileName = file.split('/').pop()
    const baseNameSplited = rawFileName.split('.')
    baseNameSplited.pop()
    const baseNameWithoutExt = baseNameSplited.join('.');
    const thumbPath = `./bucket/videos/thumbs/${baseNameWithoutExt}.jpg`;
    const savedThumbPath = await this.createVideoThumbnail(file, thumbPath);
    
    const mimeType = this.getMimeTypeFromImageFile(savedThumbPath);
    return {
      mimeType,
      stream: fs.createReadStream(savedThumbPath),
    };
  }
  
  async getContentThumb(user: User, id: string) {
    const content = await this.contentsService.findById(user, id);
    if (!content) {
      return null;
    }
    if (content.type === ContentType.Photo) {
      return this.getContentImageThumb(content);
    }
    return this.getContentVideoThumb(content);
  }
}
