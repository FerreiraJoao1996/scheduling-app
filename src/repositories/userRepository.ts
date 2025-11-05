import { db } from "database/db";
import { UserDTO } from "modules/users/dto/user";
import { ResultSetHeader } from "mysql2";

export class UserRepository {

  static async findById(id: string) {
    const [rows] = await db.query("SELECT id, name, email FROM users WHERE id = ?", [id]);
    return (rows as any[])[0] ?? null;
  }

  static async findByEmail(email: string) {
    const [rows] = await db.query("SELECT id, password FROM users WHERE email = ?", [email]);
    return (rows as any[])[0] ?? null;
  }

  static async create(user: UserDTO): Promise<UserDTO> {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (roleId, orgId, password, email, phone, name, preferences) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user.roleId, user.orgId, user.password, user.email, user.phone, user.name, JSON.stringify({})]
    );

    const insertedUser: UserDTO = {
      ...user,
      id: result.insertId,
    };

    return insertedUser;
  }

}
