import express from "express";
import registerController from "../controllers/registerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import orderController from "../controllers/orderController.js";
import authController from "../controllers/authController.js";

const router = express.Router();

// rotas públicas
router.post("/auth/register", registerController.register);
router.post("/auth/login", authController.login);



router.use(authMiddleware);
// Rota privada através do login para realizar o CRUD
router.get("/order", orderController.list);
router.get("/order/:orderId", orderController.getById);
router.post("/order", orderController.create);
router.put("/order/:orderId", orderController.update);
router.delete("/order/:orderId", orderController.delete);

export default router;