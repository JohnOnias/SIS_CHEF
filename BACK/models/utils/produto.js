import { Produto, ItemPedido } from "../../database/models/index.js";

// Buscar produtos por categoria
export async function getProdutosID(idCategoria) {
  try {
    const produtos = await Produto.findAll({
      where: { categoria_id: idCategoria },
      attributes: ["id", "nome", "preco", "descricao"],
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar produtos por categoria:", err);
    throw err;
  }
}

// Buscar todos os produtos
export async function getTodosProdutos() {
  try {
    const produtos = await Produto.findAll({
      attributes: ["id", "nome", "preco", "descricao", "categoria_id"],
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar todos os produtos:", err);
    throw err;
  }
}

// Adicionar produtos a um pedido
export async function adicionarProdutosPedido(pedidoId, produtos) {
  if (!pedidoId) throw new Error("ID do pedido não foi definido");
  if (!produtos || produtos.length === 0)
    throw new Error("Nenhum produto para adicionar");

  try {
    const itensCriados = await Promise.all(
      produtos.map((produto) =>
        ItemPedido.create({
          pedido_id: pedidoId,
          produto_id: produto.id,
          quantidade: produto.quantidade,
          preco_unitario: produto.preco,
        })
      )
    );

    return { success: true, itens: itensCriados };
  } catch (err) {
    console.error("Erro em adicionarProdutosPedido:", err);
    throw err;
  }
}
