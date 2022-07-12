import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsUUID, ValidateNested } from 'class-validator';
import { Profile } from '../entities/profile.entity';

class game {
  @IsUUID()
  id: string;

  @IsBoolean()
  fav: boolean;

  @IsInt()
  imdb: number;
}

export class addGameDto {
  @IsUUID()
  @ApiProperty({
    description: 'A Profile UUID',
    example: 'c1c8fae3-d8a1-462b-ba24-50b17900a6dc',
  })
  profile: string;

  @ApiProperty({
    description:
      'A game Array with objects {id: "", fav: boolean, imdb: integer}',
    example:
      '[{ "id":"", "fav":true, "imdb": 3},{ "id":"", "fav": false, "imdb": 4 }]',
  })
  @ValidateNested({ each: true })
  @Type(() => game)
  games: game[];
}
