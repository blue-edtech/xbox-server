import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { isAdmin } from 'src/utils/handle-admin.util';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { deleteGenreDTO } from './dto/delete-genre.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGameDto, user: User) {
    isAdmin(user);
    const data: Prisma.GameCreateInput = {
      ...dto,
      genres: {
        connect: dto.genres?.map((genresID) => ({
          id: genresID,
        })),
      },
    };

    return this.prisma.game.create({ data }).catch(handleError);
  }

  async findAll(skip: number) {
    const GameList = await this.prisma.game.findMany({
      skip: skip,
      take: 10,
      select: {
        id: true,
        title: true,
        coverImageURL: true,
        description: true,
        year: true,
        genres: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    if (GameList.length == 0) {
      return { message: 'nenhum jogo cadastrado' };
    } else {
      return GameList;
    }
  }
  findAllFavorites(id: string) {
    return this.prisma.profileGame.findMany({
      where: { profileId: id, favorite: true },
      select: {
        id: true,
        game: {
          select: {
            title: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.game.findUnique({
      where: { id },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: string, dto: UpdateGameDto, user: User) {
    isAdmin(user);
    return this.prisma.game
      .update({
        where: { id },
        data: {
          ...dto,
          genres: {
            connect: dto.genres?.map((genresID) => ({
              id: genresID,
            })),
          },
        },
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.game.delete({ where: { id } }).catch(handleError);
    return { message: 'Game successfully deleted' };
  }

  async imdbUpdate(id: string) {
    let imdbScore = 0;

    const game = await this.prisma.game
      .findUnique({ where: { id: id } })
      .catch(handleError);

    const games = await this.prisma.profileGame.findMany({
      where: { gameId: id },
    });

    games.forEach((g) => {
      imdbScore += g.imdbScore;
    });
    imdbScore = imdbScore / games.length;

    game.imdbScore = +imdbScore.toFixed(2);
    return this.prisma.game.update({
      where: { id: game.id },
      data: game,
    });
  }
  removeGenre(deleteGenreDTO: deleteGenreDTO) {
    return this.prisma.game.update({
      where: {
        id: deleteGenreDTO.id,
      },
      data: {
        genres: {
          disconnect: deleteGenreDTO.genres.map((genresID) => ({
            id: genresID,
          })),
        },
      },
    });
  }
}
