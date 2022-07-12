import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'Leonardo',
    email: 'leo@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
  {
    name: 'Bruno',
    email: 'bruno@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: false,
  },
  {
    name: 'Marcelo',
    email: 'marcelo@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: false,
  },
  {
    name: 'Bruna',
    email: 'bruna@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
  {
    name: 'Diego',
    email: 'diego@blue.com.br',
    password: 'Blue2022#',
    CPF: cpf.generate(),
    isAdmin: true,
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};
