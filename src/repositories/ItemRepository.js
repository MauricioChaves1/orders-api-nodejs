import pool from "../config/database.js";

class ItemRepository {

    async createMany(items) {

        const createdItems = [];

        for (const item of items) {

            const query = `
                INSERT INTO items 
                (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;

            const values = [
                item.orderId,
                item.productId,
                item.quantity,
                item.price
            ];

            const result = await pool.query(query, values);

            createdItems.push(result.rows[0]);

        }

        return createdItems;

    }

    async findByOrderId(orderId) {

        const query = `
            SELECT *
            FROM items
            WHERE order_id = $1
            AND deleted_at IS NULL
        `;

        const result = await pool.query(query, [orderId]);

        return result.rows;

    }

    async deleteByOrderId(orderId) {

        const query = `
            UPDATE items
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE order_id = $1
        `;

        await pool.query(query, [orderId]);

    }

    async updateTimestamp(itemId) {

        const query = `
            UPDATE items
            SET updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
        `;

        await pool.query(query, [itemId]);

    }

    async delete(itemId) {

        const query = `
        UPDATE items
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
    `;

        await pool.query(query, [itemId]);

    }

    async updateOrderId(oldOrderId, newOrderId) {

        const query = `
        UPDATE items
        SET order_id = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE order_id = $2
    `;

        await pool.query(query, [newOrderId, oldOrderId]);

    }

}

export default new ItemRepository();