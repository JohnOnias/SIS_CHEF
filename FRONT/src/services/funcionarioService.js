// src/services/funcionarioService.js
import { api, isElectron } from "./api";

/**
 * BACK (sua lista):
 * - window.api.funcionario.cadastrarFuncionario(nome, cpf, email, cargo, senha) -> usuario
 * - window.api.funcionario.getFuncionario(tipoFuncionario) -> array
 *
 * Observação: em alguns preloads isso aparece em pedido.getFuncionario.
 * Este service suporta os dois.
 */

export async function cadastrarFuncionario(nome, cpf, email, cargo, senha) {
  if (!isElectron) throw new Error("Electron necessário (window.api).");
  if (!api?.funcionario?.cadastrarFuncionario) {
    throw new Error("Preload não expõe funcionario.cadastrarFuncionario.");
  }

  const usuario = await api.funcionario.cadastrarFuncionario(
    String(nome || "").trim(),
    String(cpf || "").trim(),
    String(email || "").trim(),
    String(cargo || "").trim(),
    String(senha || "")
  );

  if (!usuario || !usuario.id) throw new Error("Falha ao cadastrar funcionário.");
  return usuario;
}

export async function getFuncionario(tipoFuncionario) {
  if (!isElectron) return [];

  const tipo = String(tipoFuncionario || "").trim();

  const fn1 = api?.funcionario?.getFuncionario;
  if (typeof fn1 === "function") {
    const data = await fn1(tipo);
    return Array.isArray(data) ? data : [];
  }

  // fallback: alguns preloads expõem em pedido.getFuncionario
  const fn2 = api?.pedido?.getFuncionario;
  if (typeof fn2 === "function") {
    const data = await fn2(tipo);
    return Array.isArray(data) ? data : [];
  }

  return [];
}

// alias amigável
export const listarFuncionarios = getFuncionario;
