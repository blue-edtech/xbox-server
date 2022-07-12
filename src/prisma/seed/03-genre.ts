import { Prisma, PrismaClient } from '@prisma/client';

export const genres: Prisma.GenreCreateInput[] = [
  {
    name: 'FPS',
  },
  {
    name: 'Adventure',
  },
  {
    name: 'Action',
  },
  {
    name: 'Racing',
  },
  {
    name: 'Puzzle',
  },
  {
    name: 'grand strategy',
  },
];

export const genre = async (prisma: PrismaClient) => {
  for (const obj of Object.values(genres)) {
    await prisma.genre.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
