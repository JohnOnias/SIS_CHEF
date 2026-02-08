// src/services/catalogStorage.js

const KEY_CATEGORIES = "catalog_categories";
const KEY_PRODUCTS_PREFIX = "catalog_products_";

const seedCategories = [
  {
    id: 1,
    nome: "Entradas",
    imagem:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 2,
    nome: "Principais",
    imagem:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 3,
    nome: "Sobremesas",
    imagem:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 4,
    nome: "Bebidas",
    imagem:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=60",
  },
];

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function ensureCatalogSeed() {
  const raw = localStorage.getItem(KEY_CATEGORIES);
  if (!raw) localStorage.setItem(KEY_CATEGORIES, JSON.stringify(seedCategories));
}

export function getCategories() {
  ensureCatalogSeed();
  const raw = localStorage.getItem(KEY_CATEGORIES);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function addCategory({ nome, imagem }) {
  const cats = getCategories();
  const nova = {
    id: Date.now(),
    nome: String(nome || "").trim(),
    imagem: String(imagem || "").trim(),
  };
  const atualizado = [nova, ...cats];
  localStorage.setItem(KEY_CATEGORIES, JSON.stringify(atualizado));
  return atualizado;
}

export function deleteCategory(id) {
  const cats = getCategories().filter((c) => c.id !== id);
  localStorage.setItem(KEY_CATEGORIES, JSON.stringify(cats));
  localStorage.removeItem(`${KEY_PRODUCTS_PREFIX}${id}`);
  return cats;
}

export function getProductsByCategory(categoryId) {
  const raw = localStorage.getItem(`${KEY_PRODUCTS_PREFIX}${categoryId}`);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function setProductsByCategory(categoryId, produtos) {
  localStorage.setItem(
    `${KEY_PRODUCTS_PREFIX}${categoryId}`,
    JSON.stringify(produtos)
  );
  return produtos;
}

export function addProduct(categoryId, { nome, preco, descricao }) {
  const produtos = getProductsByCategory(categoryId);
  const novo = {
    id: Date.now(),
    nome: String(nome || "").trim(),
    preco: Number(preco),
    descricao: String(descricao || "").trim(),
  };
  return setProductsByCategory(categoryId, [...produtos, novo]);
}

export function updateProduct(categoryId, productId, data) {
  const produtos = getProductsByCategory(categoryId);
  const atualizado = produtos.map((p) =>
    p.id === productId ? { ...p, ...data } : p
  );
  return setProductsByCategory(categoryId, atualizado);
}

export function deleteProduct(categoryId, productId) {
  const produtos = getProductsByCategory(categoryId);
  const atualizado = produtos.filter((p) => p.id !== productId);
  return setProductsByCategory(categoryId, atualizado);
}
