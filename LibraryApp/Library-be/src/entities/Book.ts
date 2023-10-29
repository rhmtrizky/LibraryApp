import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Borrow } from './Borrow';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image?: string;

  @Column()
  stock: number;

  @OneToMany((type) => Borrow, (borrow) => borrow.book)
  borrows: Borrow[];
}
