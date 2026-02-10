// src/services/categoryService.js
import { api, isElectron } from "./api";

function resolveId(c) {
  return c?.id ?? c?.ID ?? c?.categoria_id ?? c?.categoriaId ?? c?.category_id ?? null;
}

export async function getCategorias() {
  if (!isElectron) return [];
  if (!api?.categoria?.getCategorias) return [];

  const categorias = await api.categoria.getCategorias(); // deveria vir [{id,nome,status}]
  return (categorias || []).map((c) => ({
    id: resolveId(c),
    nome: c?.nome,
    status: c?.status,
  }));
}

export async function listarCategorias() {
  return await getCategorias();
}

export async function cadastrarCategoria(nome, status = 1) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.categoria?.cadastrarCategoria) throw new Error("Preload não expõe categoria.cadastrarCategoria.");

  if (!nome || !String(nome).trim()) throw new Error("Informe o nome da categoria.");

  const ok = await api.categoria.cadastrarCategoria(String(nome).trim(), status);
  if (!ok) throw new Error("Backend retornou false ao cadastrar categoria.");

  return true;
}

// “quietos” (você pediu não testar agora)
export async function atualizarCategoria() {
  console.warn("[categoryService] atualizarCategoria não existe no BACK/preload. Ignorando chamada.");
  return false;
}
export async function removerCategoria() {
  console.warn("[categoryService] removerCategoria não existe no BACK/preload. Ignorando chamada.");
  return false;
}
