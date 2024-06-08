import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MinLength(2, { message: 'Movie title must have atleast 2 characters' })
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsDate()
  releaseDate: Date;
  @IsString()
  @IsNotEmpty()
  genre: string;
}
