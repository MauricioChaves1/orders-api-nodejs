import "dotenv/config"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "../repositories/UserRepository.js";
import { reqLoginDto } from "../dtos/login/reqLoginDto.js";
import { resLoginDto } from "../dtos/login/resLoginDto.js";

class AuthService {

    async login(data) {

        // 1️⃣ Converte e valida os dados recebidos usando o DTO
        const dto = reqLoginDto(data);

        const user = await this.findUserByEmail(dto.email);

        await this.validatePassword(dto.password, user.password);

        const token = this.generateToken(user);

        // 5️⃣ Retorna o DTO de resposta (token + mensagem)
        return resLoginDto(token);
    }

    // Busca usuário pelo email no banco
    async findUserByEmail(email) {

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        return user;
    }

    // Compara senha enviada com senha criptografada no banco
    async validatePassword(password, hashedPassword) {

        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            throw new Error("Credenciais inválidas");
        }
    }

    // Cria o token JWT contendo id do usuario
    generateToken(user) {

        return jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
    }
}

export default new AuthService();