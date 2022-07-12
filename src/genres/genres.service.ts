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

  create(dto: CreateGenreDto, user: User) {
    isAdmin(user);
    return this.prisma.genre.create({ data: dto }).catch(handleError);
  }

  async findAll() {
    const GenreList = await this.prisma.genre.findMany();

    if (GenreList.length == 0) {
      return { message: 'nenhum genero cadastrado' };
    } else {
      return GenreList;
    }
  }

  findAllGames(skip: number) {
    return this.prisma.genre.findMany({
      skip: skip,
      take: 10,
      include: {
        games: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.genre.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateGenreDto, user: User) {
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
