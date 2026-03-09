// Importa o service responsável pela lógica de cadastro.
import registerService from "../services/registerService.js";

class RegisterController {

    async register(req, res) {

        try {

            // Envia os dados da requisição (body) para o service.
            const result = await registerService.register(req.body);

            // Retorna os dados tratados no DTO de resposta para evitar o retorno de informações sensíveis ou inesperadas, como a senha
            return res.status(201).json(result);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });
        }
    }
}

export default new RegisterController();