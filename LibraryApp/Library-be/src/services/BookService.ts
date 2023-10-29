import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Book } from '../entities/Book';
import { Member } from '../entities/Member';
import { Borrow } from '../entities/Borrow';
import { Return } from '../entities/Return';

class BookService {
  private readonly bookRepository: Repository<Book> = AppDataSource.getRepository(Book);
  private readonly borrowRepository: Repository<Borrow> = AppDataSource.getRepository(Borrow);
  private readonly memberRepository: Repository<Member> = AppDataSource.getRepository(Member);
  private readonly returnRepository: Repository<Return> = AppDataSource.getRepository(Return);

  async find(req: Request, res: Response) {
    try {
      const books = await this.bookRepository.find();

      let response = [];
      books.forEach((book) => {
        response.push({
          ...book,
          id: book.id,
          code: book.code,
          title: book.title,
          stock: book.stock,
        });
      });
      return res.status(200).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async borrowBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const member = await this.memberRepository.findOne({
        where: {
          id: loginSession.id,
        },
      });

      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      if (member.penalty === true) {
        return res.status(400).json({ error: 'You are get pinalty' });
      }

      const book = await this.bookRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (book.stock <= 0) {
        return res.status(400).json({ error: 'Book is out of stock' });
      }

      const memberId = member;
      const bookId = book;

      const borrowBook = this.borrowRepository.create({
        member: memberId,
        book: bookId,
      });

      book.stock -= 1;

      const borrowCreated = await this.borrowRepository.save(borrowBook);
      const bookUpdated = await this.bookRepository.save(book);
      return res.status(200).json({ message: 'susccesfull borrow book', borrowBook });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const member = await this.memberRepository.findOne({
        where: {
          id: loginSession.id,
        },
      });

      const book = await this.bookRepository.findOne({
        where: {
          id: id,
        },
      });

      const memberId = member;
      const bookId = book;

      if (!member) {
        return res.status(404).json({ error: 'Cant return book because is not yours' });
      }

      const returnBook = this.returnRepository.create({
        member: memberId,
        book: bookId,
      });

      const borrow = await this.borrowRepository.findOne({
        where: {
          book: book,
          member: member,
        },
      });

      if (!borrow) {
        return res.status(404).json({ error: 'data borrow not found' });
      }

      // Record the return date and borrowing date from the Borrow record
      const returnDate = new Date() as any;
      const borrowingDate = borrow.borrowDate as any;

      // Calculate the number of days the book was borrowed
      const daysBorrowed = Math.floor((returnDate - borrowingDate) / (1000 * 60 * 60 * 24));

      if (daysBorrowed > 7) {
        member.penalty = true;

        await this.memberRepository.save(member);
      }

      const deletedBorrow = await this.borrowRepository.findOne({
        where: {
          book: book,
        },
      });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (book.stock === 0) {
        book.stock += 1;
      }

      if (!deletedBorrow) {
        return res.status(404).json({ error: 'No matching borrow record found' });
      }

      if (deletedBorrow) {
        await this.borrowRepository.remove(deletedBorrow);
      }

      const borrowCreated = await this.returnRepository.save(returnBook);
      const bookUpdated = await this.bookRepository.save(book);

      return res.status(200).json({ message: 'Successful return book', returnBook });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new BookService();
