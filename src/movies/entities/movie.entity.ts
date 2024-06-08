import { Rating } from "../../ratings/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    genre: string;

    @Column()
    releaseDate: Date

    @OneToMany(() => Rating, (rating) => rating.movie)
    ratings: Rating[];
}
