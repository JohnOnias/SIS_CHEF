// src/services/authService.js
import { api, isElectron } from "./api";

export async function login(email, senha) {
  if (!isElectron) throw new Error("Login só funciona no Electron (window.api).");
  if (!api?.login?.login) throw new Error("Preload não expõe window.api.login.login.");

  const usuario = await api.login.login(email, senha); // {id,nome,email,tipo}
  if (!usuario || !usuario.id) throw new Error("Email ou senha inválidos.");

  if (!api?.user?.setCurrentUser) throw new Error("Preload não expõe window.api.user.setCurrentUser.");
  const ok = await api.user.setCurrentUser(usuario);
  if (!ok) throw new Error("Falha ao setar usuário atual (setCurrentUser).");

  return usuario;
}

export async function getCurrentUser() {
  if (!isElectron) return null;
  if (!api?.user?.getCurrentUser) return null;
  return await api.user.getCurrentUser(); // {id,nome,email,tipo} | null
}

export async function logout() {
  if (!isElectron) return true;
  if (!api?.user?.setCurrentUser) return true;
  return await api.user.setCurrentUser(null);
}
