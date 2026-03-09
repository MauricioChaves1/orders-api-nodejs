import { reqItemDto } from "../item/reqItemDto.js";

export function reqOrderDto(data) {

    if (!data.numeroPedido) {
        throw new Error("numeroPedido é obrigatório");
    }

    if (!data.valorTotal) {
        throw new Error("valorTotal é obrigatório");
    }

    if (!data.dataCriacao) {
        throw new Error("dataCriacao é obrigatório");
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("items é obrigatório");
    }

    return {
        numeroPedido: data.numeroPedido,
        valorTotal: Number(data.valorTotal),
        dataCriacao: new Date(data.dataCriacao),
        items: data.items.map(reqItemDto)
    };

}