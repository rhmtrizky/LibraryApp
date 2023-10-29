import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Borrow } from './Borrow';

@Entity({ name: 'members' })
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  penalty: boolean;

  @Column({ type: 'timestamp', nullable: true })
  penaltyEndDate: Date | null;

  @OneToMany((type) => Borrow, (borrow) => borrow.member)
  borrows: Borrow[];
}
