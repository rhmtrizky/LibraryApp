import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './Member';
import { Book } from './Book';

@Entity({ name: 'borrows' })
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.borrows)
  member: Member;

  @ManyToOne(() => Book, (book) => book.borrows)
  book: Book;

  @CreateDateColumn()
  borrowDate: Date;
}
