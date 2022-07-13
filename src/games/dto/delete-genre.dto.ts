import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class deleteGenreDTO {
  @IsUUID('all')
  @ApiProperty({
    description: 'A valid game ID',
    example: 'c1c8fae3-d8a1-462b-ba24-50b17900a6dc',
  })
  id: string;

  @IsUUID('all', { each: true })
  @ApiProperty({
    description: 'A array of valids genres ID',
    example:
      '["c1c8fae3-d8a1-462b-ba24-50b17900a6dc", "c1c8fae3-d8a1-462b-ba24-50b17900a6dc"]',
  })
  genres: string[];
}
