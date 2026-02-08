import { Produto } from "../../database/models/index.js"; // Importa do index.js central

// Cadastrar um produto
export async function cadastrarProduto(produto) {
  try {
    await Produto.create({
      nome: produto.nome,
      preco: produto.preco,
      categoria_id: produto.idCategoria,
      descricao: produto.descricao,
    });
    return { success: true, message: "produto cadastrado com sucesso" }; // sucesso
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    return { success: false, error: err.message };
  }
}

// Buscar produtos por ID de categoria
export async function getProdutosID(idCategoria) {
  try {
    const produtos = await Produto.findAll({
      attributes: ["id", "nome", "preco", "descricao"],
      where: { categoria_id: idCategoria },
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw err;
  }
}
