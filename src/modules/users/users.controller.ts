import { Request, Response } from 'express';
import { UserDTO } from './dto/user';
import { UsersService } from './users.service';

export type UserDTOExpress = Omit<UserDTO, 'id'> & {
  id?: string;
};

export class UsersController {
  static async create(request: Request, response: Response): Promise<void> {
    const body = request.body;
    response.status(200).send(await UsersService.create(body));
  }
};
