import { Genre } from '@prisma/client';

export class Game {
  id?: string;
  title: string;
  coverImageURL: string;
  description: string;
  year: number;
  imdbScore: number;
  trailerYouTubeUrl: string;
  gameplayYouTubeUrl: string;
  genres?: Genre[];
  createdAt?: Date;
  updatedAt?: Date;
}
