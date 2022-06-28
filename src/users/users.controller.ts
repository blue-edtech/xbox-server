import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoggedUser } from 'src/utils/logged-user.decorator';
import { changePassDto } from './dto/change-pass.dto';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Recebe uma requisição GET e retorna um objeto de status
   * da aplicação com a URL de documentação
   * @param req Objeto de Request do Express
   * @returns Objeto de status da aplicação
   */

  @Post()
  @ApiOperation({
    summary: 'Create a new User',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Get a list of all Users from the database',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({
    summary: 'Get a User by ID',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Use to update partial or total a User by ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @LoggedUser() user: User,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a User by ID',
  })
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    return this.usersService.remove(id, user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Used to change user`s password',
  })
  @Put('change-pass')
  changePass(@Body() changePassDto: changePassDto, @LoggedUser() user: User) {
    return this.usersService.changePass(changePassDto, user);
  }
}
