import authService from "../services/authService.js";

class AuthController {

    async login(req, res) {

        try {

            // Apenas chama o service passando o body
            const result = await authService.login(req.body);

            // Retorna os dados tratados pelo Dto
            return res.status(200).json(result);

        } catch (error) {

            return res.status(401).json({
                message: error.message
            });

        }
    }
}

export default new AuthController();