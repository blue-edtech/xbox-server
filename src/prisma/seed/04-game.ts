import { Prisma, PrismaClient } from '@prisma/client';

export const games: Prisma.GameCreateInput[] = [
  {
    title: 'FPS',
    coverImageURL: '',
    description: '',
    gameplayYouTubeUrl: '',
    trailerYouTubeUrl: '',
    year: 2000,
  },
];

export const game = async (prisma: PrismaClient) => {
  for (const obj of Object.values(games)) {
    await prisma.game.upsert({
      where: { title: obj.title },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
