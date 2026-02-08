// src/services/usersStorage.js

const KEY_USERS = "app_users_v1";

const seedUsers = [
  {
    id: 1,
    role: "manager",
    nome: "Francisco Alberto",
    cpf: "000.000.000-00",
    email: "francisco@exemplo.com",
    senha: "1234",
  },
  { id: 2, role: "waiter", nome: "Luan Pereira de Souza", cpf: "", email: "", senha: "" },
  { id: 3, role: "waiter", nome: "Ana Maria de Oliveira", cpf: "", email: "", senha: "" },
  { id: 4, role: "waiter", nome: "Renan Patos do Santos", cpf: "", email: "", senha: "" },
  { id: 5, role: "waiter", nome: "Vitoria Alcantara", cpf: "", email: "", senha: "" },
  { id: 6, role: "waiter", nome: "Tereza Benicio Mota", cpf: "", email: "", senha: "" },
  { id: 7, role: "waiter", nome: "Lucas Pessoa Lima", cpf: "", email: "", senha: "" },
];

function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function ensureUsersSeed() {
  const raw = localStorage.getItem(KEY_USERS);
  if (!raw) localStorage.setItem(KEY_USERS, JSON.stringify(seedUsers));
}

export function getUsers() {
  ensureUsersSeed();
  const raw = localStorage.getItem(KEY_USERS);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
  return users;
}

export function addUser(user) {
  const users = getUsers();
  const novo = { ...user, id: Date.now() };
  return saveUsers([...users, novo]);
}

export function updateUser(id, patch) {
  const users = getUsers();
  const updated = users.map((u) => (u.id === id ? { ...u, ...patch } : u));
  return saveUsers(updated);
}

export function deleteUser(id) {
  const users = getUsers();
  const updated = users.filter((u) => u.id !== id);
  return saveUsers(updated);
}
