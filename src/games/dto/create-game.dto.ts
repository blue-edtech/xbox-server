import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'Name for the game',
    example: 'God of War',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Cover image URL of the game',
    example: 'https://m.media-amazon.com/images/I/913r59lGp-L._AC_SX342_.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  coverImageURL: string;

  @ApiProperty({
    description: 'Description of the game history',
    example:
      'God of War is an action-adventure game franchise created by David Jaffe at Sony`s Santa Monica Studio.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Release year (just numbers YYYY)',
    example: '2018',
  })
  @Min(1950)
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Rated score 0 - 5',
    example: '3',
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  @IsNotEmpty()
  imdbScore?: number;

  @ApiProperty({
    description: 'Trailer URL of the game on YOUTUBE',
    example: 'https://youtu.be/FyIwEFXOcaE',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Matches(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/,
    {
      message: 'the link must be a valid youtube link',
    },
  )
  trailerYouTubeUrl: string;

  @ApiProperty({
    description: 'Gameplay URL of the game on YOUTUBE',
    example: 'https://youtu.be/Wf5tpMhziII',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Matches(
    /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/,
    {
      message: 'the link must be a valid youtube link',
    },
  )
  gameplayYouTubeUrl: string;

  @IsUUID('all', { each: true })
  @IsOptional()
  genres?: string[];
}
