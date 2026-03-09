export function reqItemDto(data) {

    if (!data.idItem) {
        throw new Error("idItem é obrigatório");
    }

    if (!data.quantidadeItem) {
        throw new Error("quantidadeItem é obrigatório");
    }

    if (!data.valorItem) {
        throw new Error("valorItem é obrigatório");
    }

    return {
        idItem: String(data.idItem),
        quantidadeItem: Number(data.quantidadeItem),
        valorItem: Number(data.valorItem)
    };

}