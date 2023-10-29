import { Request, Response } from 'express';
import BookService from '../services/BookService';

class BookController {
  async find(req: Request, res: Response) {
    BookService.find(req, res);
  }

  async borrowBook(req: Request, res: Response) {
    BookService.borrowBook(req, res);
  }
  async returnBook(req: Request, res: Response) {
    BookService.returnBook(req, res);
  }
}

export default new BookController();
