import { Rating } from '../../ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isAdmin: boolean = false;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
