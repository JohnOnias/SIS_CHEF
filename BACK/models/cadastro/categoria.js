import { Categoria } from "../../database/models/index.js";

export async function cadastrarCategoria(nomeCategoria, status) {
  try {
    const categoria = await Categoria.create({
      nome: nomeCategoria,
      status: status,
    });

    return true;
  } catch (error) {
    console.error("Erro ao cadastrar categoria:", error);
    return { success: false, error: error.message };
  }
}

export async function getCategoria() {
  try {
    const categorias = await Categoria.findAll({
      attributes: ["id", "nome", "status"],
      order: [["nome", "ASC"]], // Ordena por nome (opcional)
    });

    return categorias;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error; // Mantém o mesmo comportamento de rejeição
  }
}
