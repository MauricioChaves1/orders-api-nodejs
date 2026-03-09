class Order {

    constructor({
        id = null,
        orderId,
        value,
        creationDate,
        createdAt = null,
        updatedAt = null,
        deletedAt = null
    }) {

        if (typeof orderId !== "string") {
            throw new Error("orderId precisa ser uma string");
        }

        if (typeof value !== "number") {
            throw new Error("value precisa ser um número");
        }

        if (!creationDate) {
            throw new Error("creationDate é obrigatório");
        }

        this.id = id;
        this.orderId = orderId;
        this.value = value;
        this.creationDate = creationDate;

        // timestamps do banco
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

}

export default Order;