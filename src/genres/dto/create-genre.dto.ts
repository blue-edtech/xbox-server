import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({
    description: 'Genre of the game',
    example: 'Adventure',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
