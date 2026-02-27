import { Categoria } from "../../database/models/index.js";


export async function cadastrarCategoria(nomeCategoria, status) {
  console.log("chegou no model", nomeCategoria, status);

  try {
    const categoria = await Categoria.create({
      nome: nomeCategoria,
      status: status,
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
      order: [["nome", "ASC"]],
    });

    return { success: true, data: categorias };

  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return { success: false, error: error.message };
  }
}