import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './Member';
import { Book } from './Book';

@Entity({ name: 'returns' })
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.borrows)
  member: Member;

  @ManyToOne(() => Book, (book) => book.borrows)
  book: Book;

  @CreateDateColumn()
  borrowDate: Date;
}
