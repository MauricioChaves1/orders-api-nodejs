import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {

    try {

        // Extrai o token do header Authorization
        const token = req.headers.authorization?.split(" ")[1];

        // Valida o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Salva os dados do token na requisição
        req.user = decoded;

        return next();

    } catch {

        return res.status(401).json({
            message: "Acesso não autorizado"
        });
    }
}

export default authMiddleware;