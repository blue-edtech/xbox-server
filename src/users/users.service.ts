import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/handle-admin.util';
import { changePassDto } from './dto/change-pass.dto';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (!cpf.isValid(dto.CPF)) {
      return {
        message: 'Invalid NIN (CPF). Please, key it in again!',
      };
    }
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user
      .create({
        data,
        select: {
          name: true,
          email: true,
          CPF: true,
          isAdmin: true,
          password: false,
        },
      })
      .catch(handleError);
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        CPF: false,
        isAdmin: true,
        password: false,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, dto: UpdateUserDto, user: User) {
    isAdmin(user);
    if (!cpf.isValid(dto.CPF)) {
      return {
        message: 'Invalid NIN (CPF). Please, key it in again!',
      };
    }
    const data: Partial<User> = { ...dto };
    return this.prisma.user
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    isAdmin(user);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User successfully deleted' };
  }

  async changePass(changePassDto: changePassDto, user: User) {
    const userDB = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userDB) {
      throw new UnauthorizedException('User and/or password is invalid');
    }

    const isHashValid = await bcrypt.compare(
      changePassDto.oldPassword,
      userDB.password,
    );
    if (!isHashValid) {
      throw new UnauthorizedException('User and/or password is invalid');
    }

    if (changePassDto.password != changePassDto.confPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    userDB.password = await bcrypt.hash(changePassDto.password, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: userDB,
    });

    return { message: 'User`s password successfully updated' };
  }
}
