import { Query, Get, Controller, Request, UseGuards, ParseIntPipe, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { TagsService } from './tags.service';
import { User } from "../users/schemas/user.schema";

@ApiTags('tags')
@UseGuards(AuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get('')
  async list(
    @Request() request,
    @Query('page', new ParseIntPipe({ optional: true })) page: number
  ) {
    const user = request.user as User;
    return this.tagsService.list(user.id, page)
  }
}
