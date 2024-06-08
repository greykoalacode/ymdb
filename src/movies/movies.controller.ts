import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Response } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  async find(
    @Query('genre') genre: string,
    @Query('sort') sortBy: string,
    @Query('title') title: string,
    @Res() res: Response,
  ) {
    try {
      let movies: Movie[];
      if (genre) {
        movies = await this.moviesService.findByGenre(genre);
        if (movies.length === 0) {
          res
            .status(404)
            .json({ message: `No movies found for genre: ${genre}` });
          return;
        }
      } else if (title) {
        movies = await this.moviesService.findByTitle(title);
        if (movies.length === 0) {
          res
            .status(404)
            .json({ message: `No movies found for title: ${title}` });
          return;
        }
      } else if (sortBy === 'rating') {
        movies = await this.moviesService.findAllSortedByRating();
        if (movies.length === 0) {
          res.status(404).json({ message: 'No movies found' });
          return;
        }
      } else {
        movies = await this.moviesService.findAll();
        if (movies.length === 0) {
          res.status(404).json({ message: 'No movies found' });
          return;
        }
      }
      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('/upcoming')
  async findUpcoming(@Res() res: Response) {
    let movies: Movie[];
    movies = await this.moviesService.findUpcomingMovies();
    if (movies.length === 0) {
      res.status(404).json({ message: 'No movies ahead' });
      return;
    } else {
      res.status(200).json(movies);
      return;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      let movie: Movie;
      movie = await this.moviesService.findOne(+id);
      if (!movie) {
        res.status(404).json({ message: 'No movie found' });
        return;
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
