import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRatingDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    movieId: number;

    @IsInt()
    @IsNotEmpty()
    score: number;

    @IsString()
    comment: string;
}
