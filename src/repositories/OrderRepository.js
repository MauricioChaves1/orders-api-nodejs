import pool from "../config/database.js";

class OrderRepository {

    async list() {

        const query = `
            SELECT *
            FROM orders
            WHERE deleted_at IS NULL
        `;

        const result = await pool.query(query);

        return result.rows;

    }

    async findByOrderId(orderId) {

        const query = `
            SELECT *
            FROM orders
            WHERE order_id = $1
        `;

        const result = await pool.query(query, [orderId]);

        return result.rows[0];

    }

    async findByOrderIdDeletedIsNull(orderId) {

        const query = `
            SELECT *
            FROM orders
            WHERE order_id = $1 
            AND deleted_at IS NULL
        `;

        const result = await pool.query(query, [orderId]);

        return result.rows[0];

    }

    async create(order) {

        const query = `
            INSERT INTO orders (order_id, value, creation_date)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const values = [
            order.orderId,
            order.value,
            order.creationDate
        ];

        const result = await pool.query(query, values);

        return result.rows[0];

    }

    async update(orderId, data) {

        const query = `
            UPDATE orders
            SET value = $1,
                creation_date = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $3
            AND deleted_at IS NULL
            RETURNING *
        `;

        const values = [
            data.value,
            data.creationDate,
            orderId
        ];

        const result = await pool.query(query, values);

        return result.rows[0];

    }

    async delete(orderId) {

        const query = `
            UPDATE orders
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE order_id = $1
        `;

        await pool.query(query, [orderId]);

    }

}

export default new OrderRepository();