import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
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
  CPF: string;

  @ApiProperty({
    description: 'If user is admin of server',
    example: true,
  })
  @IsBoolean()
  isAdmin?: boolean;
}
