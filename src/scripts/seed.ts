import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { AppModule } from '../app.module';
import { Movie } from '../movies/entities/movie.entity';
import { MoviesService } from '../movies/movies.service';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { RatingsService } from '../ratings/ratings.service';
import { Users } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const movieService = app.get(MoviesService);
  const userService = app.get(UsersService);
  const ratingService = app.get(RatingsService);

  const movies: Partial<Movie>[] = JSON.parse(
    fs.readFileSync('src/scripts/movies.json', 'utf-8'),
  );
  const users: Partial<Users>[] = JSON.parse(
    fs.readFileSync('src/scripts/users.json', 'utf-8'),
  );
  const ratings: CreateRatingDto[] = JSON.parse(
    fs.readFileSync('src/scripts/ratings.json', 'utf-8'),
  );

  await movieService.createBulk(movies);
  await userService.createBulk(users);
  await ratingService.createBulk(ratings);

  await app.close();
}

bootstrap();
