import { Produto  } from "../../database/models/index.js";


// Buscar produtos por categoria
export async function getProdutosID(idCategoria) {
  try {
    const produtos = await Produto.findAll({
      where: { id_categoria: idCategoria },
      attributes: ["id", "nome", "preco", "descricao"],
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar produtos por categoria:", err);
    throw err;
  }
}

// Buscar todos os produtos








