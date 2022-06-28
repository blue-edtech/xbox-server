import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { isAdmin } from 'src/utils/handle-admin.util';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto, user: User) {
    isAdmin(user);
    return await this.prisma.genre.create({ data: dto }).catch(handleError);
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

  async update(id: string, dto: UpdateGenreDto, user: User) {
    isAdmin(user);
    const data: Partial<Genre> = { ...dto };
    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.genre.delete({ where: { id } });
    return { message: 'Genre successfully deleted' };
  }
}
