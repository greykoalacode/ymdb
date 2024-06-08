import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService
  ) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto, @Res() res: Response) {
    try {
      let { movieId, userId } = createRatingDto;
      let existingRating = await this.ratingsService.findOneByMovieAndUser(userId, movieId);
      if(existingRating){
        res.status(400).json({ message: 'Rating already exists. Use PUT/PATCH request to update'});
        return;
      }
      let response = await this.ratingsService.create(createRatingDto);
      if(response !== null){
        res.status(201).json({ message: 'Rating added successfully'});
        return;
      } else {
        res.status(400).json({ message: 'Rating could not be added'});
        return;
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error'});
      return;
    }
  }

  @Post('/bulk')
  createMultipleRatings(@Body() multipleRatings: CreateRatingDto[]) {
    return this.ratingsService.createBulk(multipleRatings);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete()
  removeAll(){
    return this.ratingsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
