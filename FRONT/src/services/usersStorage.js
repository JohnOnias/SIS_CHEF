// src/services/usersStorage.js
import { api, isElectron } from "./api";

const KEY_USERS = "app_users_v2";

// armazena só os usuários que você cadastrou via BACK
function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function getUsers() {
  const raw = localStorage.getItem(KEY_USERS);
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
  return users;
}

// ✅ CADASTRO REAL NO BACK (SEM CRIAR funcionarioService)
// ⚠️ IMPORTANTE: swap (senha <-> cargo) por causa do IPC do back
export async function addUser({ role, nome, cpf, email, senha }) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");

  if (!api?.funcionario?.cadastrarFuncionario) {
    throw new Error("Preload não expõe funcionario.cadastrarFuncionario.");
  }

  // role -> cargo que você usa no app
  const cargo =
    role === "manager" ? "Gerente" :
    role === "waiter" ? "Garçom" :
    role === "adm" ? "Administrador" :
    String(role || "");

  // 🔥 SWAP: preload envia (nome, cpf, email, cargo, senha)
  // mas o IPC espera (nome, cpf, email, senha, tipo)
  // então passamos (senha, cargo) no lugar de (cargo, senha)
  const usuario = await api.funcionario.cadastrarFuncionario(
    String(nome || "").trim(),
    String(cpf || "").trim(),
    String(email || "").trim().toLowerCase(),
    String(senha || ""),     // <-- vai virar "senha" no IPC
    String(cargo || "")      // <-- vai virar "tipo" no IPC
  );

  if (!usuario) throw new Error("Falha ao cadastrar funcionário.");

  // guarda localmente porque não existe API de listar funcionários no preload
  const users = getUsers();
  const novo = {
    id: usuario.id,
    role,
    nome: usuario.nome,
    cpf,
    email: usuario.email,
    senha: true, // back retorna senha:true
    tipo: usuario.tipo,
  };

  saveUsers([...users, novo]);
  return novo;
}

// edit/delete não existe no BACK via preload → mantém só local (se você quiser remover depois)
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
