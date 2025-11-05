import { Request, Response } from 'express';
import { OrganizationDTO } from './dto/organization';
import { OrganizationsService } from './organization.service';

export type OrganizationDTOExpress = Omit<OrganizationDTO, 'id'> & {
  id?: string;
};

export class OrganizationsController {
  static async create(request: Request, response: Response): Promise<void> {
    const body = request.body;
    response.status(200).send(await OrganizationsService.create(body));
  }
};
