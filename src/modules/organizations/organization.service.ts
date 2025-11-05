import { OrganizationRepository } from "repositories/organizationRepository";
import { OrganizationDTO } from "./dto/organization";


export class OrganizationsService {
  static async create(data: OrganizationDTO): Promise<OrganizationDTO> {

    return await OrganizationRepository.create(data);
  }
}
