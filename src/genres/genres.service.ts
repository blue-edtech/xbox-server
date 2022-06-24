import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto) {
    return await this.prisma.genre.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.genre.findMany();
  }

  async findAllGames() {
    return await this.prisma.genre.findMany({
      include: {
        games: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.genre.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateGenreDto) {
    const data: Partial<Genre> = { ...dto };
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.prisma.genre.delete({ where: { id } });
    return { message: 'Genre successfully deleted' };
  }
}
