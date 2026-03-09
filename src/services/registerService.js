import { reqRegisterDto } from "../dtos/register/reqRegisterDto.js";
import { resRegisterDto } from "../dtos/register/resRegisterDto.js";
import userRepository from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

class RegisterService {

    async register(data) {

        // Converte os dados recebidos para um DTO de requisição
        // garantindo que apenas os campos esperados sejam utilizados
        const dto = reqRegisterDto(data);

        await this.checkEmailExists(dto.email);

        const hashedPassword = await this.hashPassword(dto.password);

        // Cria uma instância do model User
        // representando a estrutura da tabela users
        const user = new User({
            name: dto.name,
            email: dto.email.toLowerCase(),
            password: hashedPassword
        });

        // Envia o model para o repository
        const createdUser = await userRepository.create(user);

        // evitando expor campos sensíveis como a senha
        return resRegisterDto(createdUser);

    }

    // Verifica se já existe um usuário cadastrado com o mesmo email
    async checkEmailExists(email) {

        const user = await userRepository.findByEmail(email);

        // Caso o usuário exista, não realiza o cadastro
        if (user) {
            throw new Error("Email já cadastrado");
        }

    }

    // utilizando bcrypt para criptografia
    async hashPassword(password) {

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
        return bcrypt.hash(password, saltRounds);

    }
}

export default new RegisterService();