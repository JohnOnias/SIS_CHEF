import { Produto, Categoria } from "../../database/models/index.js";

// Cadastrar um produto
export async function cadastrarProduto(nome, preco, idCategoria, descricao) {
  try {
    await Produto.create({
      nome: nome,
      preco: preco,
      id_categoria: idCategoria,
      descricao: descricao,
    });
    return { success: true, message: "produto cadastrado com sucesso" }; // sucesso
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    return { success: false, error: err.message };
  }
}

export async function editarProduto(idProduto, nome, preco, descricao) {
  console.log(
    "dados recebidos pelo update produto: id:",
    idProduto,
    "nome: ",
    nome,
    "preço: ",
    preco,
    "descrição: ",
    descricao,
  );
  try {
    const [atualizados] = await Produto.update(
      {
        nome,
        preco,
        descricao,
      },
      {
        where: { id: idProduto },
      },
    );

    if (atualizados === 0) {
      return {
        success: false,
        error: "Produto não encontrado ou sem alterações",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    return { success: false, error: "Erro inesperado ao editar produto" };
  }
}

export async function deletarProduto(idProduto) {
  try {
  
    const [atualizados] = await Produto.update(
      { status: "indisponivel" }, 
      { where: { id: idProduto } },
    );

    if (atualizados === 0) {
      return {
        success: false,
        error: "Produto não encontrado ou já indisponível",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao marcar produto como indisponível:", error);
    return { success: false, error: "Erro inesperado ao atualizar produto" };
  }
}

// Buscar produtos por ID de categoria
export async function getProdutosID(idCategoria) {
  try {
    const produtos = await Produto.findAll({
      where: {
        id_categoria: idCategoria,
        status: "disponivel", 
      },
      order: [["nome", "ASC"]],
    });

    return produtos.map((p) => p.toJSON());
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
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nome", "status"],
          where: { status: "disponivel" }, // filtra apenas categorias disponíveis
        },
      ],
    });

    return produtos;
  } catch (err) {
    console.error("Erro ao buscar todos os produtos:", err);
    throw err;
  }
}
