import { Request, Response } from 'express';
import MemberService from '../services/MemberService';

class MemberController {
  async find(req: Request, res: Response) {
    MemberService.find(req, res);
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = res.locals.loginSession.id;

      const response = await MemberService.findOne(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new MemberController();
