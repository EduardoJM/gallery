import { Body, Query, Get, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Request, UploadedFile, UseGuards, UseInterceptors, ParseIntPipe, Param, Put, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../auth/auth.guard";
import { ChangeCreatorDto, CreateCreatorDto, SetCreatorLinksDto } from "./dto";
import { CreatorsService } from './creators.service';
import { User } from "../users/schemas/user.schema";

@ApiTags('creators')
@UseGuards(AuthGuard)
@Controller('creators')
export class CreatorsController {
  constructor(private creatorsService: CreatorsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('cover'))
  async create(
    @Request() request,
    @Body() createCreatorDto: CreateCreatorDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg|image/png|image/jpg|image/gif' }),
        ]
      }),
    ) cover: Express.Multer.File,
  ) {
    const user = request.user as User;
    return this.creatorsService.create(user, cover.path, createCreatorDto);
  }

  @Get('')
  async list(
    @Request() request,
    @Query('page', new ParseIntPipe({ optional: true })) page: number
  ) {
    const user = request.user as User;
    return this.creatorsService.list(user, page)
  }

  @Get(':id')
  async findById(@Request() request, @Param('id') id: string) {
    const user = request.user as User;
    return this.creatorsService.findById(user, id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('cover'))
  async update(
    @Request() request,
    @Body() changeCreatorDto: ChangeCreatorDto,
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg|image/png|image/jpg|image/gif' }),
        ],
        fileIsRequired: false,
      }),
    ) cover?: Express.Multer.File,
  ) {
    const user = request.user as User;
    return this.creatorsService.update(user, id, cover?.path || null, changeCreatorDto);
  }

  @Put(':id/links')
  async setCreatorLinks(
    @Request() request,
    @Param('id') id: string,
    @Body() setCreatorLinkDto: SetCreatorLinksDto,
  ) {
    const user = request.user as User;
    return this.creatorsService.setLinks(user, id, setCreatorLinkDto);
  }
}
