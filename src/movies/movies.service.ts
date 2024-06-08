import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  create(movie: CreateMovieDto) {
    const newMovie = this.movieRepository.create(movie);
    return this.movieRepository.save(newMovie);
  }

  async createBulk(movies: Partial<Movie>[]) {
    try {
      const movieEntities = this.movieRepository.create(movies); 
      return await this.movieRepository.save(movieEntities);
    } catch (error) {
      console.error('Error creating movies:', error);
      throw error;
    }
  }

  findAll() {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .orderBy('movie.id')
      .getMany();
  }

  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

  findAllSortedByRating() {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .select(['movie.*', 'coalesce(avg(rating.score),0) as avg_rating', 'coalesce(min(rating.score),0) as min_score','coalesce(max(rating.score),0) as max_score'])
      .groupBy('movie.id')
      .addGroupBy('movie.title')
      .orderBy('avg_rating', 'DESC')
      .maxExecutionTime(1000)
      .getRawMany();
  }

  findByGenre(genre: string) {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .where('movie.genre ILIKE :genre', { genre: `%|${genre}|%` })
      .orWhere('movie.genre ILIKE :genrePrefix', { genrePrefix: `%${genre}|%` })
      .orWhere('movie.genre ILIKE :genreSuffix', { genreSuffix: `%|${genre}%` })
      .orWhere('movie.genre = :genreExact', { genreExact: genre })
      .getMany();
  }

  findByTitle(title:string){
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .where('movie.title ILIKE :title', { title: `%${title}%` })
      .orWhere('movie.title = :titleExact', { titleExact: title })
      .getMany();
  }

  findUpcomingMovies() {
    return this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'rating')
      .where('movie.releaseDate >= :date',{date: new Date().toLocaleString()})
      .getMany();
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update({ id }, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}
