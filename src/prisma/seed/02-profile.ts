// import { Prisma, PrismaClient } from '@prisma/client';

// export const profiles: Prisma.ProfileCreateInput[] = [
//   {
//     title: 'leoruiz197',
//     imageURL: 'http://imgperfil.blue.com/leoruiz197',
//     user: 
//   },
// ];

// export const profile = async (prisma: PrismaClient) => {
//   for (const obj of Object.values(profiles)) {
//     await prisma.profile.upsert({
//       where: { title: obj.title },
//       update: {},
//       create: {
//         ...obj,
//       },
//     });
//   }
// };
