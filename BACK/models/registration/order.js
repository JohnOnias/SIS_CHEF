import {
  Produto,
  Pedido,
  ItemPedido,
  Funcionario,
  Mesa,
} from "../../database/models/index.js";

/* =========================
   PEDIDOS
========================= */

export async function getPedidos() {
  try {
    const pedidos = await Pedido.findAll({
      attributes: [
        "id",
        "mesa_numero",
        "data_criacao",
        "status",
        "valor_total",
        "id_funcionario",
      ],
      order: [["data_criacao", "DESC"]],
    });

    return pedidos;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
}

export async function editarPedido(idPedido, dadosAtualizados) {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }

    const { mesa_numero, status, id_funcionario } = dadosAtualizados;

    await pedido.update({
      mesa_numero,
      status,
      id_funcionario,
    });

    return { success: true, message: "Pedido atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return { success: false, error: error.message };
  }
}

export async function registrarPedido(numeroMesa, idGarcom) {
  try {
    const mesa = await Mesa.findOne({ where: { numero: numeroMesa } });

    if (!mesa) {
      throw new Error("Numeração de mesa não cadastrada!");
    }

    if (mesa.status.toLowerCase() === "ocupada") {
      throw new Error("Mesa já ocupada.");
    }

    const pedidoExistente = await Pedido.findOne({
      where: { mesa_numero: numeroMesa, status: "aberto" },
    });

    if (pedidoExistente) {
      throw new Error("Mesa já tem um pedido.");
    }

    mesa.status = "ocupada";
    await mesa.save();

    const pedido = await Pedido.create({
      mesa_numero: numeroMesa,
      data_criacao: new Date(),
      status: "aberto",
      valor_total: 0,
      id_funcionario: idGarcom,
    });

    return { success: true, id: pedido.id };
  } catch (err) {
    console.error("Erro no registrarPedido:", err);
    throw err;
  }
}

/* =========================
   PRODUTOS
========================= */

export async function getTodosProdutos() {
  try {
    const produtos = await Produto.findAll({
      attributes: [
        "id",
        "nome",
        "preco",
        "descricao",
        "id_categoria",
        "status",
      ],
    });

    return produtos;
  } catch (err) {
    console.error("Erro ao buscar todos os produtos:", err);
    throw err;
  }
}

export async function adicionarProdutosPedido(idPedido, idProduto, quantidade) {
  try {
    if (!idPedido) {
      throw new Error("ID do pedido não definido");
    }

    if (quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = await Produto.findByPk(idProduto);
    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    if (produto.status?.toLowerCase() !== "disponivel") {
      throw new Error("Produto inativo, não pode ser adicionado ao pedido");
    }

    const pedido = await Pedido.findByPk(idPedido);
    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    if (pedido.status !== "aberto") {
      throw new Error("Pedido não está aberto");
    }

    const item = await ItemPedido.create({
      id_pedido: idPedido,
      id_produto: idProduto,
      quantidade,
      preco_unitario: produto.preco,
    });

    return item;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    throw error;
  }
}

export async function removerProdutoPedido(idPedido, idProduto, quantidade) {
  try {
    const item = await ItemPedido.findOne({
      where: { id_pedido: idPedido, id_produto: idProduto },
    });

    if (!item) {
      throw new Error("Produto não encontrado no pedido");
    }

    if (item.quantidade < quantidade) {
      throw new Error("Quantidade a remover maior que a existente");
    }

    item.quantidade -= quantidade;

    if (item.quantidade === 0) {
      await item.destroy();
      return { success: true, message: "Produto removido do pedido" };
    }

    await item.save();
    return {
      success: true,
      message: "Quantidade do produto atualizada",
    };
  } catch (err) {
    console.error("Erro ao remover produto:", err);
    return { success: false, error: err.message };
  }
}

export async function listarItensPedido(idPedido) {
  try {
    const itens = await ItemPedido.findAll({
      where: { id_pedido: idPedido },
      include: {
        model: Produto,
        attributes: ["id", "nome", "preco", "descricao"],
      },
    });

    return itens.map((item) => item.toJSON());
  } catch (err) {
    console.error("Erro ao listar itens:", err);
    throw err;
  }
}

/* =========================
   LISTAGENS
========================= */

export async function getListaPedidos() {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Funcionario,
          attributes: ["nome"],
          required: true,
        },
      ],
    });

    return pedidos.map((p) => p.get({ plain: true }));
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    throw error;
  }
}

export async function listarPedidosMesa(mesaNumero) {
  try {
    const pedidos = await Pedido.findAll({
      where: { mesa_numero: mesaNumero, status: "aberto" },
      attributes: [
        "id",
        "mesa_numero",
        "data_criacao",
        "status",
        "valor_total",
        "id_funcionario",
      ],
      order: [["data_criacao", "DESC"]],
    });

    return pedidos;
  } catch (error) {
    console.error("Erro ao listar pedidos da mesa:", error);
    throw error;
  }
}

/* =========================
   STATUS
========================= */

export async function fecharPedido(idPedido, valorTotal) {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }

    await pedido.update({
      status: "fechado",
      valor_total: valorTotal,
    });

    return pedido;
  } catch (error) {
    console.error("Erro ao fechar pedido:", error);
    return { success: false, error: error.message };
  }
}

export async function cancelarPedido(idPedido) {
  try {
    const pedido = await Pedido.findByPk(idPedido);

    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }

    await pedido.update({ status: "cancelado" });

    return pedido;
  } catch (error) {
    console.error("Erro ao cancelar pedido:", error);
    return { success: false, error: error.message };
  }
}
