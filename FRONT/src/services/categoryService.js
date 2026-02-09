import { api, isElectron } from "./api";

// enquanto o back não tiver coluna "imagem" para categoria,
// a UI usa uma imagem padrão:
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60";

export async function listarCategorias() {
  if (!isElectron) return [];

  const categorias = await api.categoria.listarCategorias();

  return (categorias || []).map((c) => ({
    id: c.id,
    nome: c.nome,
    status: c.status,
    imagem: DEFAULT_IMAGE,
  }));
}

export async function cadastrarCategoria({ nome /*, imagem */ }, status = 1) {
  if (!isElectron) {
    throw new Error("Cadastro de categoria só funciona no Electron (window.api).");
  }

  if (!nome || !String(nome).trim()) {
    throw new Error("Informe o nome da categoria.");
  }

  // preload espera (nomeCategoria, status)
  return await api.categoria.cadastrarCategoria(String(nome).trim(), status);
}
