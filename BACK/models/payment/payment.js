import { Pagamento, Pedido } from "../../database/models/index.js";

import { Mesa } from "../../database/models/index.js";




export async function cadastrarPagamento(
  pedidoId,
  tipoPagamento,
  valorPago,
  mesa,
) {
  try {
    const pagamento = await Pagamento.create({
      id_pedido: pedidoId,
      tipo_pagamento: tipoPagamento,
      valor_pago: valorPago,
    });

    if (pagamento) {
      // Atualiza status da mesa para livre
      await Mesa.update({ status: "livre" }, { where: { numero: mesa } });
      await Pedido.update({ status: "fechado"}, { where: {id: pedidoId}});

    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar pagamento:", error);
    return { success: false, error: error.message };
  }
}



export async function buscarPagamentoPorPedidoId(pedidoId) {
  try {
    const pagamento = await Pagamento.findOne({
      where: { id_pedido: pedidoId },
      attributes: ["id", "id_pedido", "tipo_pagamento", "dividido", "valor_pago"],
    });
    return pagamento;
  } catch (error) {
    console.error("Erro ao buscar pagamento por pedido ID:", error);
    throw error; // Mantém o mesmo comportamento de rejeição
  }
}


export async function todosOsPagamentos() {
  try {
    const pagamentos = await Pagamento.findAll({
      attributes: ["id", "id_pedido", "tipo_pagamento", "dividido", "valor_pago"],
      order: [["id", "ASC"]], // Ordena por ID (opcional)
    }); 
    return pagamentos;
    } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    throw error; // Mantém o mesmo comportamento de rejeição
    }
}


