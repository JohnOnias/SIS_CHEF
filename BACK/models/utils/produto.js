import { Produto, ItemPedido, Pedido } from "../../database/models/index.js";


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







