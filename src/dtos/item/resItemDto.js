export function resItemDto(item) {

    return {
        productId: item.product_id,
        quantity: item.quantity,
        price: Number(item.price)
    };

}