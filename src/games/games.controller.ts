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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('game')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({
    summary: 'Create a Game',
  })
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiOperation({
    summary: 'Get a list of All Games on database',
  })
  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Game by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Use to update partial or total a Game by ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @ApiOperation({
    summary: 'Remove a Game by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
