class Item {

    constructor({
        id = null,
        orderId,
        productId,
        quantity,
        price,
        createdAt = null,
        updatedAt = null,
        deletedAt = null
    }) {

        if (typeof orderId !== "string") {
            throw new Error("orderId precisa ser string");
        }

        if (typeof productId !== "number") {
            throw new Error("productId precisa ser número");
        }

        if (typeof quantity !== "number") {
            throw new Error("quantity precisa ser número");
        }

        if (typeof price !== "number") {
            throw new Error("price precisa ser número");
        }

        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

}

export default Item;