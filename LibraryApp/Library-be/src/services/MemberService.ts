import { Repository } from 'typeorm';
import { Member } from '../entities/Member';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

class MemberService {
  private readonly memberRepository: Repository<Member> = AppDataSource.getRepository(Member);

  async find(req: Request, res: Response) {
    try {
      const members = await this.memberRepository.find();

      let response = [];
      members.forEach((member) => {
        response.push({
          ...member,
          id: member.id,
          code: member.code,
          name: member.name,
        });
      });
      return res.status(200).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const member = await this.memberRepository.findOne({
        where: {
          id: id,
        },

        relations: {
          borrows: {
            book: true,
          },
        },
      });
      return {
        id: member.id,
        code: member.code,
        name: member.name,
        email: member.email,
        borrows: member.borrows,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new MemberService();
