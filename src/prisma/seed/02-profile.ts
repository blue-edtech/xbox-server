import { Prisma, PrismaClient } from '@prisma/client';

export const profiles: Prisma.ProfileCreateInput[] = [
  {
    title: 'leoruiz197',
    imageURL: 'http://imgperfil.blue.com/leoruiz197',
    user: {
      connect: {
        email: 'leo@blue.com.br',
      },
    },
  },
  {
    title: 'leoruiz1972',
    imageURL: 'http://imgperfil.blue.com/leoruiz197',
    user: {
      connect: {
        email: 'bruno@blue.com.br',
      },
    },
  },
  {
    title: 'leoruiz1973',
    imageURL: 'http://imgperfil.blue.com/leoruiz197',
    user: {
      connect: {
        email: 'marcelo@blue.com.br',
      },
    },
  },
  {
    title: 'leoruiz1974',
    imageURL: 'http://imgperfil.blue.com/leoruiz197',
    user: {
      connect: {
        email: 'bruna@blue.com.br',
      },
    },
  },
  {
    title: 'leoruiz1975',
    imageURL: 'http://imgperfil.blue.com/leoruiz197',
    user: {
      connect: {
        email: 'diego@blue.com.br',
      },
    },
  },
];

export const profile = async (prisma: PrismaClient) => {
  for (const obj of Object.values(profiles)) {
    await prisma.profile.upsert({
      where: { title: obj.title },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
