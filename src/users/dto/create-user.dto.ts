import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name for the user',
    example: 'Leonardo Orabona',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User`s Email',
    example: 'leo@blue.com.br',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User`s Passaword',
    example: 'Blue2022',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User`s CPF number',
    example: '123.123.123-12',
  })
  @Length(13, 14)
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$/, {
    message: 'the CPF document must contains this mask 123.123.123-12',
  })
  CPF: string;

  @ApiProperty({
    description: 'If user is admin of server',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
