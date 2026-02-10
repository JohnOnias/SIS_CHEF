import { Mesa, Pedido } from "../../database/models/index.js";
import { Op } from "sequelize";

export async function cadastrarMesa(mesa) {
  const transaction = await Mesa.sequelize.transaction();

  try {
    // Validação
    if (!mesa.numero) {
      await transaction.rollback();
      return { success: false, error: "Número da mesa é obrigatório." };
    }

    // Verifica se mesa já existe
    const mesaExistente = await Mesa.findOne({
      where: { numero: mesa.numero },
      transaction,
    });

    if (mesaExistente) {
      await transaction.rollback();
      return { success: false, error: "Mesa já cadastrada." };
    }

    // Cria a mesa
    const mesaCriada = await Mesa.create(
      {
        numero: mesa.numero,
        status: mesa.status || "livre", // Valor padrão
        n_cadeiras: mesa.n_cadeiras || 4, // Valor padrão
      },
      { transaction },
    );

    await transaction.commit();

    return {
      mesaCriada
    };
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("Erro ao cadastrar mesa:", error);
    return handleSequelizeError(error);
  }
}


export async function getMesas(filtros = {}) {
  try {
    const mesas = await Mesa.findAll({
      attributes: ["id", "numero", "status", "n_cadeiras"],
      where: Object.keys(where).length > 0 ? where : undefined,
      order: [["numero", "ASC"]],
      raw: true, // Retorna objetos simples
    });

    return mesas;
  } catch (error) {
    console.error("Erro ao buscar mesas:", error);
    throw error;
  }
}

export async function deletarMesa(numero_mesa) {
  const transaction = await Mesa.sequelize.transaction();

  try {
    const mesa = await Mesa.findOne({
      where: { numero: numero_mesa },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!mesa) {
      await transaction.rollback();
      return { success: false, error: "Mesa não encontrada." };
    }

    if (mesa.status.toLowerCase() === "ocupada") {
      await transaction.rollback();
      return {
        success: false,
        error: "Não é possível excluir a mesa. Ela está ocupada.",
      };
    }

    const pedidoMesa = await Pedido.findOne({
      where: {
        mesa_numero: numero_mesa,
        status: "ativo",
      },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (pedidoMesa) {
      await transaction.rollback();
      return {
        success: false,
        error: "Não é possível excluir a mesa. Ela possui pedidos ativos.",
      };
    }

    const deletedRows = await Mesa.destroy({
      where: { numero: numero_mesa },
      transaction,
    });

    await transaction.commit();

    return {
      success: true,
      deletedRows,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("Erro ao deletar mesa:", error);
    throw error;
  }
}

export async function verificarMesa(numero_mesa) {
  try {
    const mesa = await Mesa.findOne({
      where: { numero: numero_mesa },
    });

    return mesa ? [mesa.get({ plain: true })] : [];
  } catch (error) {
    console.error("Erro ao verificar mesa:", error);
    throw error;
  }
}

export async function verificarMesaPedido(numero_mesa) {
  try {
    const pedidos = await Pedido.findAll({
      where: {
        mesa_numero: numero_mesa,
        status: {
          [Op.notIn]: ["finalizado", "cancelado"],
        },
      },
    });

    return pedidos;
  } catch (error) {
    console.error("Erro ao verificar pedidos da mesa:", error);
    throw error;
  }
}

export async function listarPedidos(numero_mesa) {
  try {
    const pedidos = await Pedido.findAll({
      where: {
        mesa_numero: numero_mesa,
        status: {
          [Op.notIn]: ["finalizado", "cancelado"],
        },
      },
    });

    return pedidos;
  } catch (error) {
    console.error("Erro ao verificar pedidos da mesa:", error);
    throw error;
  }
}

export async function mudarStatus(numero_mesa, novoStatus = "Ocupada") {
  const transaction = await Mesa.sequelize.transaction();

  try {
    const [affectedRows] = await Mesa.update(
      { status: novoStatus },
      {
        where: { numero: numero_mesa },
        transaction,
      },
    );

    await transaction.commit();

    return {
      success: true,
      changes: affectedRows,
      message:
        affectedRows > 0
          ? `Status da mesa ${numero_mesa} atualizado para "${novoStatus}"`
          : `Mesa ${numero_mesa} não encontrada`,
    };
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("Erro ao mudar status da mesa:", error);
    return { success: false, error: error.message };
  }
}




export async function excluirMesa(numero_mesa) {
  const transaction = await Mesa.sequelize.transaction();

  try {
    // Verifica se há pedidos ativos na mesa
    const pedidosAtivos = await verificarMesaPedido(numero_mesa);

    if (pedidosAtivos.length > 0) {
      await transaction.rollback();
      return {
        success: false,
        error:
          "Não é possível excluir a mesa. Existem pedidos ativos vinculados a ela.",
      };
    }

    const affectedRows = await Mesa.destroy({
      where: { numero: numero_mesa },
      transaction,
    });

    await transaction.commit();

    return {
      success: affectedRows > 0,
      message:
        affectedRows > 0
          ? `Mesa ${numero_mesa} excluída com sucesso.`
          : `Mesa ${numero_mesa} não encontrada.`,
    };
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    console.error("Erro ao excluir mesa:", error);
    return handleSequelizeError(error);
  }
}
export async function listarMesas() {

  try {
    const mesas = await Mesa.findAll({
      attributes: ["id", "numero", "status", "n_cadeiras"],
      order: [["numero", "ASC"]],
      raw: true, // Retorna objetos simples
    });
    return mesas;
  } catch (error) {
    console.error("Erro ao listar mesas:", error);
    throw error;
  }
}

export async function getMesasDisponiveis() {
  try {
    const mesas = await Mesa.findAll({
      where: {
        status: "livre",
        n_cadeiras: {
          [Op.gte]: 1, // Pode adicionar filtro por número de cadeiras
        },
      },
      attributes: ["id", "numero", "n_cadeiras"],
      order: [
        ["n_cadeiras", "DESC"],
        ["numero", "ASC"],
      ],
    });

    return mesas;
  } catch (error) {
    console.error("Erro ao buscar mesas disponíveis:", error);
    throw error;
  }
}

// Função auxiliar para tratamento de erros
function handleSequelizeError(error) {
  console.error("Erro no Sequelize:", error);

  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((err) => `${err.path}: ${err.message}`);
    return { success: false, error: errors.join(", ") };
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return { success: false, error: "Número da mesa já cadastrado." };
  }

  return { success: false, error: error.message || "Erro na operação" };
}

console.log("Mesa model carregado com Sequelize!");
