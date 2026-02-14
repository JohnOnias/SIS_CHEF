import {
  Produto,
  Pedido,
  ItemPedido,
  Mesa,
} from "../../database/models/index.js";

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
    console.log("Entrou no registrarPedido, mesa:", numeroMesa, idGarcom);

    // Verifica se a mesa existe
    const mesa = await Mesa.findOne({ where: { numero: numeroMesa } });
    if (!mesa) {
      throw new Error("Numeração de mesa não cadastrada!");
    }

    if (mesa.status.toLowerCase() === "ocupada") {
      throw new Error("Mesa já ocupada.");
    }

    // Verifica se já existe um pedido para essa mesa aberto
    const pedidoExistente = await Pedido.findOne({
      where: { mesa_numero: numeroMesa, status: "aberto" },
    });

    if (pedidoExistente) {
      throw new Error("Mesa já tem um pedido.");
    }

    // Muda o status da mesa para "ocupada"
    mesa.status = "ocupada";
    await mesa.save();

    // Cria o pedido
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

// Buscar todos os produtos
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
  // Buscar produto
  const produto = await Produto.findByPk(idProduto);
  if (!produto) {
    throw new Error("Produto não encontrado");
  }
  let statusProduto = produto.status?.toLowerCase();
  console.log("Status do produto:", statusProduto);
  console.log("Produto completo:", produto.toJSON());

  if (statusProduto !== "disponivel") {
    throw new Error("Produto inativo, não pode ser adicionado ao pedido");
  }
  if (quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (!idPedido) {
    throw new Error("ID do pedido não definido");
  }

  const valorUnidade = produto.preco;

  // Buscar pedido
  const pedido = await Pedido.findByPk(idPedido);
  if (!pedido) {
    throw new Error("Pedido não encontrado");
  }

  if (pedido.status !== "aberto") {
    throw new Error(
      "Não é possível adicionar produtos a um pedido que não está aberto",
    );
  }

  // Criar item do pedido
  const item = await ItemPedido.create({
    id_pedido: idPedido,
    id_produto: idProduto,
    quantidade,
    preco_unitario: valorUnidade,
  });

  return item;
}

export async function removerItem(idPedido, idProduto, quantidade) {
  try {
    const item = await ItemPedido.findOne({
      where: { id_pedido: idPedido, id_produto: idProduto },
    });
    if (!item) {
      throw new Error("Produto não encontrado no pedido");
    }
    if (item.quantidade < quantidade) {
      throw new Error(
        "Quantidade a remover é maior do que a quantidade no pedido",
      );
    }
    item.quantidade -= quantidade;
    if (item.quantidade === 0) {
      await item.destroy();

      return { success: true, message: "Produto removido do pedido" };
    } else {
      await item.save();
      return {
        success: true,
        message: "Quantidade do produto atualizada no pedido",
      };
    }
  } catch (err) {
    console.error("Erro ao remover produto do pedido:", err);
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
    console.error("Erro ao listar itens do pedido:", err);
    throw err;
  }
}

export async function listarPedidosMesa(MesaNumero) {
  try {
    const pedidos = await Pedido.findAll({
      where: { mesa_numero: MesaNumero, status: "aberto" },
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

export async function fecharPedido(idPedido, valorTotal) {
  try {
    const pedido = await Pedido.findByPk(idPedido);
    if (!pedido) {
      return { success: false, error: "Pedido não encontrado." };
    }
    await pedido.update({ status: "fechado", valor_total: valorTotal });
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
