import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { Users } from '../users/entities/user.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      let movie: Movie;
      let user: Users;
      let { movieId, userId, score, comment } = createRatingDto;
      movie = await this.movieRepository.findOneBy({ id: movieId });
      if (movie === null) {
        throw new NotFoundException(`Movie with ID ${movieId} not found`);
      }
      user = await this.userRepository.findOneBy({ id: userId });
      if (user === null) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      const newRating = this.ratingRepository.create({
        score,
        comment,
        user,
        movie,
      });
      return this.ratingRepository.save(newRating);
    } catch (error) {
      return error;
    }
  }

  async createBulk(ratings: CreateRatingDto[]) {
    for (const rating of ratings) {
      let { score, comment, userId, movieId } = rating;

      const user = await this.userRepository.findOneBy({ id: userId });
      const movie = await this.movieRepository.findOneBy({ id: movieId });

      if (!user || !movie) {
        throw new Error('Invalid user or movie ID provided');
      }

      const newRating = this.ratingRepository.create({
        score,
        comment,
        user,
        movie,
      });

      await this.ratingRepository.save(newRating);
    }
  }

  findAll() {
    return this.ratingRepository.find({
      relations: {
        movie: true,
        user: true,
      },
      order: {
        id: 'ASC'
      }
    });
  }

  findOne(id: number) {
    return this.ratingRepository.findOneBy({ id });
  }

  findOneByMovieAndUser(userId: number, movieId: number) {
    return this.ratingRepository.exists({
      where: {
        movie: {
          id: movieId,
        },
        user: {
          id: userId,
        },
      },
    });
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    let { userId, movieId, score, comment } = updateRatingDto;
    const user = await this.userRepository.exists({
      where: {
        id: userId,
      },
    });
    const movie = await this.movieRepository.exists({ where: { id: movieId } });

    if (!user || !movie) {
      throw new Error('Invalid user or movie ID provided');
    }
    return this.ratingRepository.update({ id }, { score, comment });
  }

  remove(id: number) {
    return this.ratingRepository.delete(id);
  }

  removeAll() {
    return this.ratingRepository.clear();
  }
}
