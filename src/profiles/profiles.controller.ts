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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/utils/logged-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { addGameDto } from './dto/add-game.dto';
import { UpdateProfileGameDto } from './dto/update-game.dto';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({
    summary: 'Create a Profile',
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto, @LoggedUser() user: User) {
    createProfileDto.userId = user.id;
    return this.profilesService.create(createProfileDto);
  }

  @ApiOperation({
    summary: 'Get a list of all Profiles from the database',
  })
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @ApiOperation({
    summary: 'Get a Profile by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a game on my profile',
  })
  @Patch('/updateGame')
  updateGame(@Body() updateGame: UpdateProfileGameDto) {
    return this.profilesService.updateGame(updateGame);
  }

  @ApiOperation({
    summary: 'Use to update partial or total a Profile by ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @ApiOperation({
    summary: 'Remove a Profile by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }

  @ApiOperation({
    summary: 'Add a game/s to my profile',
  })
  @Post('/addGame')
  addGame(@Body() addGame: addGameDto) {
    return this.profilesService.addGame(addGame);
  }

  @ApiOperation({
    summary: 'Get a list of all games with a profile ID',
  })
  @Get('/listGames/:id')
  listGames(@Param('id') id: string) {
    return this.profilesService.listGames(id);
  }

  @ApiOperation({
    summary: 'delete a game from a profile  with an ID',
  })
  @Delete('/DeleteGame/:id')
  deleteGame(@Param('id') id: string) {
    return this.profilesService.deleteGame(id);
  }
}
