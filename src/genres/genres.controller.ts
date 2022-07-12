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
    summary: 'Create a new Genre',
  })
  @Post()
  create(@Body() createGenreDto: CreateGenreDto, @LoggedUser() user: User) {
    return this.genresService.create(createGenreDto, user);
  }

  @ApiOperation({
    summary: 'Get a list of all Genres from the database',
  })
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ApiOperation({
    summary: 'Get a list of all Games by Genre from the database',
  })
  @Get('/games/:skip')
  findAllGames(@Param('skip') skip: number) {
    return this.genresService.findAllGames(+skip);
  }

  @ApiOperation({
    summary: 'Get a Genre by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @ApiOperation({
    summary: 'Use to update partial or total a Genre by ID',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
    @LoggedUser() user: User,
  ) {
    return this.genresService.update(id, updateGenreDto, user);
  }

  @ApiOperation({
    summary: 'Remove a Genre by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.genresService.remove(id, user);
  }
}
