import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    return await this.prisma.game.create({
      data: dto,
      select: {
        title: true,
        coverImageURL: true,
        description: true,
        year: true,
      },
    });
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

  async update(id: string, dto: UpdateGameDto) {
    const data: Partial<Game> = { ...dto };
    return this.prisma.game.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.prisma.game.delete({ where: { id } });
    return { message: 'Game successfully deleted' };
  }
}
