import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  phone: string;

  @Column('simple-json', { nullable: true })
  favoriteProducts: number[];

  @Column('simple-json', { nullable: true })
  cartProducts: { id: number; quantity: number }[];
}
