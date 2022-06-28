import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/utils/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('genre')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({
    summary: 'Create a Game',
  })
  @Post()
  create(@Body() createGenreDto: CreateGenreDto, @LoggedUser() user: User) {
    return this.genresService.create(createGenreDto, user);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get('/games')
  findAllGames() {
    return this.genresService.findAllGames();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @LoggedUser() user: User,
  ) {
    return this.genresService.update(id, updateGenreDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.genresService.remove(id, user);
  }
}
