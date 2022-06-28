import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto) {
    return await this.prisma.profile.create({ data: dto }).catch(handleError);
  }

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateProfileDto) {
    const data: Partial<Profile> = { ...dto };
    return this.prisma.profile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string) {
    await this.prisma.profile.delete({ where: { id } });
    return { message: 'Profile successfully deleted' };
  }
}
