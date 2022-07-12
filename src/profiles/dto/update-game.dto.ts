import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsUUID, isUUID } from 'class-validator';

export class UpdateProfileGameDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'A Profile UUID',
    example: 'c1c8fae3-d8a1-462b-ba24-50b17900a6dc',
  })
  profileId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'A game UUID',
    example: 'c1c8fae3-d8a1-462b-ba24-50b17900a6dc',
  })
  gameId?: string;

  @ApiProperty({
    description: 'A Profile UUID',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  favorite?: boolean;

  @ApiProperty({
    description: 'A IMDB score (just integer)',
    example: 3,
  })
  @IsInt()
  @IsOptional()
  imdbScore?: number;
}
