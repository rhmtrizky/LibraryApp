import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  register(req: Request, res: Response) {
    AuthService.register(req, res);
  }
  login(req: Request, res: Response) {
    AuthService.login(req, res);
  }
  logout(req: Request, res: Response) {
    AuthService.logout(req, res);
  }
  check(req: Request, res: Response) {
    AuthService.check(req, res);
  }
}

export default new AuthController();
