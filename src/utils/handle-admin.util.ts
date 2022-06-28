import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export function isAdmin(user: User) {
  if (!user.isAdmin) {
    throw new UnauthorizedException('Admins only!');
  }
}
