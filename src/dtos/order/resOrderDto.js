import { resItemDto } from "../item/resItemDto.js";

export function resOrderDto(order, items) {

    return {
        orderId: order.order_id,
        value: Number(order.value),
        creationDate: order.creation_date,
        items: items.map(resItemDto)
    };

}