import { Pagamento } from "../../database/models/index.js";


export async function cadastrarPagamento(pedidoId, tipoPagamento, dividido,valorPago) {
  try {
    const pagamento = await Pagamento.create({
      pedido_id: pedidoId,
      tipo_pagamento: tipoPagamento,
      dividido: dividido,
      valor_pago: valorPago,
    });
    return true;
  } catch (error) {
    console.error("Erro ao cadastrar pagamento:", error);
    return { success: false, error: error.message };
  }
}


export async function buscarPagamentoPorPedidoId(pedidoId) {
  try {
    const pagamento = await Pagamento.findOne({
      where: { pedido_id: pedidoId },
      attributes: ["id", "pedido_id", "tipo_pagamento", "dividido", "valor_pago"],
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
      attributes: ["id", "pedido_id", "tipo_pagamento", "dividido", "valor_pago"],
      order: [["id", "ASC"]], // Ordena por ID (opcional)
    }); 
    return pagamentos;
    } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    throw error; // Mantém o mesmo comportamento de rejeição
    }
}


