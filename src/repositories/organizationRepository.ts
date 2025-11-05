import { db } from "database/db";
import { OrganizationDTO } from "modules/organizations/dto/organization";
import { ResultSetHeader } from "mysql2";

export class OrganizationRepository {

  static async findById(id: number) {
    const [rows] = await db.query("SELECT id FROM organizations WHERE id = ?", [id]);
    return (rows as any[])[0] ?? null;
  }

  static async create(organization: OrganizationDTO): Promise<OrganizationDTO> {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO organizations (parentId, name, cnpj, address, number, neighborhood, city, complement, stateId, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        organization.parentId,
        organization.name,
        organization.cnpj,
        organization.address,
        organization.number,
        organization.neighborhood,
        organization.city,
        organization.complement,
        organization.stateId,
        organization.zipcode
      ]
    );

    const newOrganization: OrganizationDTO = {
      ...organization,
      id: result.insertId,
    };

    return newOrganization;
  }

}
