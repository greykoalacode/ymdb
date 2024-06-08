import { Movie } from "../../movies/entities/movie.entity";
import { Users } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number;

    @Column()
    comment: string;

    @ManyToOne(() => Users, (user) => user.ratings)
    user: Users;

    @ManyToOne(() => Movie, (movie) => movie.ratings)
    movie: Movie;
}
