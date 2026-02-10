import { Produto } from "../../database/models/index.js";

// Cadastrar um produto
export async function cadastrarProduto(produto) {
  try {
    await Produto.create({
      nome: produto.nome,
      preco: produto.preco,
      id_categoria: produto.idCategoria,
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
      attributes: [
        "id",
        "nome",
        "preco",
        "id_categoria",
        "descricao",
        "status",
      ],
      where: { id_categoria: idCategoria },
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw err;
  }
}

export async function mudarStatus(idProduto) {
  try {
    const produto = await Produto.findOne({ where: { id: idProduto } });

    if (!produto) {
      throw new Error("Produto não encontrado");
    }

    if (!produto.status) {
      produto.status = "disponivel";
    }

    produto.status =
      produto.status.toLowerCase() === "disponivel"
        ? "indisponivel"
        : "disponivel";

    await produto.save();
    return produto;
  } catch (err) {
    console.error("Erro ao mudar status do produto:", err);
    throw err;
  }
}




export async function getTodosProdutos() {
  try {
    const produtos = await Produto.findAll({
      attributes: [
        "id",
        "nome",
        "preco",
        "id_categoria",
        "descricao",
        "status",
      ],
    });
    return produtos;
  } catch (err) {
    console.error("Erro ao buscar todos os produtos:", err);
    throw err;
  }
}
