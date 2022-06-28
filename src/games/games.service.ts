import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { isAdmin } from 'src/utils/handle-admin.util';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto, user: User) {
    isAdmin(user);
    return await this.prisma.game
      .create({
        data: dto,
        select: {
          title: true,
          coverImageURL: true,
          description: true,
          year: true,
        },
      })
      .catch(handleError);
  }

  async findAll() {
    return await this.prisma.game.findMany({
      select: {
        id: true,
        title: true,
        coverImageURL: true,
        description: true,
        year: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.game.findUnique({
      where: { id },
      include: {
        genres: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateGameDto, user: User) {
    isAdmin(user);
    const data: Partial<Game> = { ...dto };
    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.game.delete({ where: { id } });
    return { message: 'Game successfully deleted' };
  }
}
