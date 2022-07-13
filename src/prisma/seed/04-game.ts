import { Prisma, PrismaClient } from '@prisma/client';

export const games: Prisma.GameCreateInput[] = [
  {
    title: 'Rainbow six siege',
    coverImageURL: 'https://store.epicgames.com/pt-BR/p/rainbow-six-siege',
    description: 'jogo de ação 5 vs 5 em mapas multiplayers',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=sf7CO5CBXUE',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=HKd-mk__BXA',
    year: 2015,
    genres: {
      connect: [
        {
          name: 'FPS',
        },
        {
          name: 'Action',
        },
      ],
    },
  },
  {
    title: 'God of War',
    coverImageURL: 'https://store.epicgames.com/pt-BR/p/god-of-war',
    description:
      'God of War é uma série de jogos eletrônicos de ação-aventura criada por David Jaffe da Santa Monica Studio, da Sony.',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=Wf5tpMhziII',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=K0u_kAWLJOA',
    year: 2018,
    genres: {
      connect: [
        {
          name: 'Adventure',
        },
        {
          name: 'Action',
        },
      ],
    },
  },
  {
    title: 'Spider-Man',
    coverImageURL:
      'https://pt.wikipedia.org/wiki/Ficheiro:Spider-Man_jogo_2018_capa.png',
    description:
      'Spider-Man é um jogo eletrônico de ação-aventura desenvolvido pela Insomniac Games e publicado pela Sony Interactive Entertainment.',
    gameplayYouTubeUrl: 'https://www.youtube.com/watch?v=LlLdzOHDfJo',
    trailerYouTubeUrl: 'https://www.youtube.com/watch?v=8pR0o2fGyHg',
    year: 2018,
    genres: {
      connect: [
        {
          name: 'Adventure',
        },
        {
          name: 'Action',
        },
      ],
    },
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
