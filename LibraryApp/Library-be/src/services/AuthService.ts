import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { loginSchema, registerSchema } from '../utils/author';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Member } from '../entities/Member';

class AuthService {
  private readonly authRepository: Repository<Member> = AppDataSource.getRepository(Member);
  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = registerSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }
      const password = await bcrypt.hash(value.password, 10);

      const checkEmail = await this.authRepository.count({
        where: {
          email: value.email,
        },
      });
      if (checkEmail > 0) {
        return res.status(400).json('Email already exist');
      }

      const randomNumber = Math.floor(100 + Math.random() * 900);
      const codeMember = `M${randomNumber}`;

      const user = this.authRepository.create({
        code: codeMember,
        name: data.name,
        email: data.email,
        password: password,
      });
      const createdUser = this.authRepository.save(user);
      return res.status(200).json({ message: 'succesfull register', user });
    } catch (error) {
      return res.status(500).json('Terjadi kesalahan  pada server');
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = loginSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }

      const checkEmail = await this.authRepository.findOne({
        where: {
          email: value.email,
        },
        select: ['id', 'code', 'name', 'email', 'password', 'borrows'],
      });

      if (!checkEmail) {
        return res.status(400).json('Email/password salah!');
      }
      const isPasswordValid = await bcrypt.compare(value.password, checkEmail.password);
      if (!isPasswordValid) {
        return res.status(400).json('Email/password salah!');
      }
      const user = {
        id: checkEmail.id,
        code: checkEmail.code,
        name: checkEmail.name,
        email: checkEmail.email,
        borrows: checkEmail.borrows,
      };
      const token = jwt.sign(user, 'rhmtrizky123', { expiresIn: '24h' });

      // const tokenJWT = jwt.sign(user,"secretkey")
      return res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      return res.status(500).json('Terjadi kesalahan  pada server');
    }
  }

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.id,
        },
        select: ['id', 'code', 'name', 'email', 'password', 'borrows'],
      });
      return res.status(200).json({
        user,
        message: 'token is valid',
      });
    } catch (error) {
      return res.status(500).json('Terjadi kesalahan  pada server');
    }
  }

  async logout(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log('Logout error:', error);
      return res.status(500).json('Terjadi kesalahan pada server');
    }
  }
}

export default new AuthService();
