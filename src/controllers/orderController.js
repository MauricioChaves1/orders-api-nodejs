import orderService from "../services/orderService.js";

class OrderController {

    // Lista todos os pedidos
    async list(req, res) {

        try {

            const orders = await orderService.list();

            return res.status(200).json(orders);

        } catch (error) {

            return res.status(500).json({
                message: error.message
            });

        }

    }

    // Busca pedido pelo orderId
    async getById(req, res) {

        try {

            const { orderId } = req.params;

            const order = await orderService.getById(orderId);

            return res.status(200).json(order);

        } catch (error) {

            return res.status(404).json({
                message: error.message
            });

        }

    }

    // Cria um novo pedido
    async create(req, res) {

        try {

            const order = await orderService.create(req.body);

            return res.status(201).json(order);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });

        }

    }

    // Atualiza pedido
    async update(req, res) {

        try {

            const { orderId } = req.params;

            const order = await orderService.update(orderId, req.body);

            return res.status(200).json(order);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });

        }

    }

    // Deleta pedido
    async delete(req, res) {

        try {

            const { orderId } = req.params;

            await orderService.delete(orderId);

            return res.status(204).send();

        } catch (error) {

            return res.status(400).json({
                message: error.message
            });

        }

    }

}

export default new OrderController();