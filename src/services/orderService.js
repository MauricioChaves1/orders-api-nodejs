import { reqOrderDto } from "../dtos/order/reqOrderDto.js";
import { resOrderDto } from "../dtos/order/resOrderDto.js";
import Order from "../models/orderModel.js";
import Item from "../models/itemModel.js";
import orderRepository from "../repositories/orderRepository.js";
import itemRepository from "../repositories/itemRepository.js";
import pool from "../config/database.js";

class OrderService {

    /**
     * Lista todos os pedidos cadastrados
     */
    async list() {

        // busca todos os pedidos
        const orders = await orderRepository.list();

        const result = [];

        for (const order of orders) {

            // busca itens do pedido
            const items = await itemRepository.findByOrderId(order.order_id);

            result.push(resOrderDto(order, items));

        }

        return result;

    }

    /**
     * Busca um pedido pelo orderId
     * Também retorna os itens relacionados
     */
    async getById(orderId) {

        const order = await orderRepository.findByOrderIdDeletedIsNull(orderId);

        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        const items = await itemRepository.findByOrderId(orderId);

        return resOrderDto(order, items);

    }
    /**
     * Cria um novo pedido
     * Fluxo:
     * 1 - Valida os dados usando DTO
     * 3 - Cria model Order
     * 4 - Salva pedido
     * 5 - Salva itens
     */
    async create(data) {

        // abre uma conexão dedicada com o banco para usar transaction
        const client = await pool.connect();

        try {

            // inicia a transaction
            await client.query("BEGIN");

            // valida e normaliza os dados recebidos da requisição
            const dto = reqOrderDto(data);

            // extrai o orderId do numeroPedido
            const orderId = this.extractOrderId(dto.numeroPedido);

            // verifica se já existe um pedido com esse orderId
            await this.checkOrderExists(orderId);

            // cria o model Order que representa a estrutura da tabela orders
            const orderModel = new Order({
                orderId,
                value: dto.valorTotal,
                creationDate: dto.dataCriacao
            });

            // salva o pedido no banco de dados
            const createdOrder = await orderRepository.create(orderModel, client);

            // salva todos os itens relacionados ao pedido
            const createdItems = await this.saveItems(orderId, dto.items);

            // confirma todas as operações realizadas na transaction
            await client.query("COMMIT");

            // retorna o pedido criado junto com os itens
            return resOrderDto(createdOrder, createdItems);

        } catch (error) {

            // desfaz todas as operações realizadas
            await client.query("ROLLBACK");

            // repassa o erro para o controller tratar
            throw error;

        } finally {

            // libera a conexão para o pool
            client.release();
        }
    }

    /**
     * Atualiza um pedido
     * Remove os itens antigos e recria os novos
     */
    async update(orderId, data) {

        // cria uma conexão dedicada com o banco para usar transaction
        const client = await pool.connect();

        try {

            // inicia a transaction
            await client.query("BEGIN");

            // valida e normaliza os dados recebidos da requisição
            const dto = reqOrderDto(data);

            // busca o pedido atual pelo orderId informado na URL
            const order = await orderRepository.findByOrderId(orderId, client);

            // caso o pedido não exista retorna erro
            if (!order) {
                throw new Error("Pedido não encontrado");
            }

            // extrai o novo orderId baseado no numeroPedido
            const newOrderId = this.extractOrderId(dto.numeroPedido);

            // verifica se já existe outro pedido com esse orderId
            await this.checkOrderExists(newOrderId);

            // cria o model do novo pedido com os dados atualizados
            const orderModel = new Order({
                orderId: newOrderId,
                value: dto.valorTotal,
                creationDate: dto.dataCriacao
            });

            // cria um novo registro de pedido no banco
            const createdOrder = await orderRepository.create(orderModel, client);

            // salva os novos itens relacionados ao novo pedido
            const createdItems = await this.saveItems(newOrderId, dto.items);

            // remove logicamente os itens do pedido antigo
            await itemRepository.deleteByOrderId(orderId, client);

            // remove logicamente o pedido antigo
            await orderRepository.delete(orderId, client);

            // finaliza a transaction confirmando todas as alterações
            await client.query("COMMIT");

            // retorna o pedido criado já formatado pelo DTO de resposta
            return resOrderDto(createdOrder, createdItems);

        } catch (error) {

            // caso qualquer erro aconteça desfaz todas as operações
            await client.query("ROLLBACK");

            // repassa o erro para o controller
            throw error;

        } finally {

            // libera a conexão para o pool
            client.release();

        }

    }
    /**
     * Deleta um pedido (delete lógico)
     */
    async delete(orderId) {

        const client = await pool.connect();

        try {

            await client.query("BEGIN");

            const order = await orderRepository.findByOrderId(orderId, client);

            if (!order) {
                throw new Error("Pedido não encontrado");
            }

            await itemRepository.deleteByOrderId(orderId, client);

            await orderRepository.delete(orderId, client);

            await client.query("COMMIT");

        } catch (error) {

            await client.query("ROLLBACK");
            throw error;

        } finally {

            client.release();

        }
    }

    /**
     * Salva múltiplos itens do pedido
     */
    async saveItems(orderId, itemsDto) {

        const itemsModel = this.mapItems(orderId, itemsDto);

        return await itemRepository.createMany(itemsModel);

    }

    /**
     * Converte DTO de items para Model
     */
    mapItems(orderId, itemsDto) {

        return itemsDto.map(item =>
            new Item({
                orderId,
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            })
        );

    }

    // Extrai orderId do numeroPedido
    extractOrderId(numeroPedido) {

        return numeroPedido.split("-")[0];

    }

    async checkOrderExists(orderId) {

        const order = await orderRepository.findByOrderId(orderId);
        if (order) {
            throw new Error("Pedido já cadastrado");
        }
    }

}

export default new OrderService();