import { Categoria } from "../../database/models/index.js";

export async function cadastrarCategoria(nomeCategoria, status) {
  console.log("chegou no model", nomeCategoria, status);
  const disponivel = "disponivel";

  try {
    const categoria = await Categoria.create({
      nome: nomeCategoria,
      status: disponivel,
    });

    return { success: true, data: categoria };
  } catch (error) {
    console.error("Erro ao cadastrar categoria:", error);
    return { success: false, error: error.message };
  }
}

export async function getCategorias() {
  try {
    const categorias = await Categoria.findAll({
      attributes: ["id", "nome", "status"],
      where: { status: "disponivel" }, // filtra apenas disponíveis
      order: [["nome", "ASC"]],
    });

    const categoriasJson = categorias.map((c) => c.toJSON());

    return { success: true, data: categoriasJson };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return { success: false, error: error.message };
  }
}

export async function editarCategoria(idCategoria, nome, status) {
  try {
    const categoria = await Categoria.findByPk(idCategoria);

    if (!categoria) {
      return { success: false, error: "Categoria não encontrada" };
    }

    categoria.nome = nome;
    categoria.status = status;

    await categoria.save();

    return { success: true, data: categoria.toJSON() };
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    return { success: false, error: error.message };
  }
}
