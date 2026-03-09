import pool from "../config/database.js";

class UserRepository {

  async findByEmail(email) {
    const query = "SELECT id,name,email,password FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (!result.rows.length) {
      return null;
    }

   return result.rows[0];
  }

  async create(user) {
    const query = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email";
    const result = await pool.query(query, [user.name, user.email, user.password]);

   return result.rows[0];
  }

}

export default new UserRepository();