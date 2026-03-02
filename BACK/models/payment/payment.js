import { Pagamento, Pedido, sequelize } from "../../database/models/index.js";


import { Mesa } from "../../database/models/index.js";




export async function cadastrarPagamento(
  pedidoId,
  tipoPagamento,
  valorPago,
  mesa,
) {
  console.log(
    "oq chegou no registrar pagamento:",
    "idPedido:",
    pedidoId,
    "tipoPagamento:",
    tipoPagamento,
    "valorpago:",
    valorPago,
    "mesa:",
    mesa,
  );

  const transaction = await sequelize.transaction();

  try {
    const pagamento = await Pagamento.create(
      {
        id_pedido: pedidoId,
        tipo_pagamento: tipoPagamento,
        valor_pago: valorPago,
      },
      { transaction },
    );

    if (!pagamento) {
      throw new Error("Falha ao criar pagamento");
    }

    await Pedido.update(
      { status: "fechado" },
      { where: { id: pedidoId }, transaction },
    );

    await Mesa.update(
      { status: "livre" },
      { where: { numero: mesa }, transaction },
    );

    await transaction.commit();

    return { success: true };
  } catch (error) {
    await transaction.rollback();
    console.error("Erro ao cadastrar pagamento:", error);
    return { success: false, error: error.message };
  }
}



export async function buscarPagamentoPorPedidoId(pedidoId) {
  console.log("oq chegou o buscamentoPagamentoPedidoId: pedidoid:", pedidoId);
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


