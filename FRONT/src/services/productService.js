// src/services/productService.js
import { api, isElectron } from "./api";

/**
 * BACK:
 * - window.api.produto.cadastrarProduto(objeto) -> true/false
 * - window.api.produto.getProdutosPorCategoria(idCategoria) -> array
 * - window.api.produto.getTodosProdutos() -> array
 * - window.api.produto.mudarStatus(idProduto) -> produto atualizado
 */

function resolveCategoriaId(input) {
  return (
    input?.idCategoria ??
    input?.categoria_id ??
    input?.categoriaId ??
    input?.category_id ??
    input?.categoria ??
    input?.categoria?.id ??
    input?.categoria?.categoria_id ??
    input?.categoria?.ID ??
    null
  );
}

export async function getProdutosPorCategoria(idCategoria) {
  if (!isElectron) return [];
  if (!api?.produto?.getProdutosPorCategoria) return [];

  const id = Number(idCategoria);
  if (!id || Number.isNaN(id)) return [];

  const data = await api.produto.getProdutosPorCategoria(id);
  return Array.isArray(data) ? data : [];
}

export const listarProdutosPorCategoria = getProdutosPorCategoria;

export async function getTodosProdutos() {
  if (!isElectron) return [];
  if (!api?.produto?.getTodosProdutos) return [];

  const data = await api.produto.getTodosProdutos();
  return Array.isArray(data) ? data : [];
}

export async function cadastrarProduto({ nome, preco, idCategoria, descricao, descrição, ...rest }) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.produto?.cadastrarProduto) throw new Error("Preload não expõe produto.cadastrarProduto.");

  const nomeLimpo = String(nome || "").trim();
  const precoNum = Number(preco);

  const idCatRaw = resolveCategoriaId({ idCategoria, ...rest });
  const idCat = Number(idCatRaw);

  const desc = String(descricao ?? descrição ?? "").trim();

  if (!nomeLimpo) throw new Error("Informe o nome do produto.");
  if (preco === "" || preco === null || Number.isNaN(precoNum)) {
    throw new Error("Informe um preço válido.");
  }
  if (!idCatRaw || Number.isNaN(idCat) || idCat <= 0) {
    throw new Error("Informe a categoria do produto.");
  }

  const obj = {
    nome: nomeLimpo,
    preco: precoNum,
    idCategoria: idCat,
    descrição: desc, // conforme sua especificação (com acento)
  };

  const ok = await api.produto.cadastrarProduto(obj);
  if (!ok) throw new Error("Backend retornou false ao cadastrar produto.");

  return true;
}

export async function mudarStatusProduto(idProduto) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.produto?.mudarStatus) throw new Error("Preload não expõe produto.mudarStatus.");

  const id = Number(idProduto);
  if (!id || Number.isNaN(id)) throw new Error("idProduto inválido.");

  return (await api.produto.mudarStatus(id)) || null;
}
