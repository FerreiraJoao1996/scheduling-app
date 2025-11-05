export interface OrganizationDTO {
  id?: number;          
  parentId?: number | null;
  name: string;
  cnpj: string;
  address: string;
  number: number;
  neighborhood: string;
  city: string;
  complement?: string;
  stateId: number;
  zipcode: string;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: any | null;
}
