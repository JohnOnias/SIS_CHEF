import { api, isElectron } from "./api";

export async function listarProdutos() {
  if (!isElectron) return [];
  return await api.produto.listarProdutos();
}

export async function listarProdutosPorCategoria(categoriaId) {
  if (!isElectron) return [];
  return await api.produto.listarProdutosPorCategoria(categoriaId);
}

export async function cadastrarProduto(data) {
  if (!isElectron) {
    throw new Error("Cadastro de produto só funciona no Electron.");
  }

  const {
    nome,
    preco,
    categoria_id,
    descricao = "",
    status = 1,
  } = data;

  return await api.produto.cadastrarProduto(
    nome,
    preco,
    categoria_id,
    descricao,
    status
  );
}
