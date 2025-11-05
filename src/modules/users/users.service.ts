import { UserDTO } from "./dto/user";
import { UserRepository } from "repositories/userRepository";
import bcrypt from 'bcrypt';
import { env } from "shared/env/env";
import { OrganizationRepository } from "repositories/organizationRepository";
import { AppError } from "shared/error/appError";
import { CacheService } from "shared/utils/cacheService";



export class UsersService {
  static async create(data: UserDTO): Promise<UserDTO> {

    const organization = await OrganizationRepository.findById(data.orgId)

    if (!organization) {
      throw new AppError("A organização informada não foi encontrada.")
    }

    const password = await bcrypt.hash(data.password, env.SALT_HASH)
    data.password = password

    const user = await UserRepository.create(data);

    await CacheService.clearPrefix("users:");

    return user;
  }


}
